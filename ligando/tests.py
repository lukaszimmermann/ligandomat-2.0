import collections
import os
from paste.deploy import appconfig
import pyramid
from sqlalchemy.orm import sessionmaker
from ligando import main, route_adder
from ligando.views.base_views import peptide_page, protein_page, source_page, source_id_page, hla_page, msrun_page, \
    organ_page
from ligando.views.db_analysis import venn_analysis, venn_analysis_result
from ligando.views.information_views import source_overview
from ligando.views.search_view import search_result

__author__ = 'Linus Backert'

from mock import Mock
import unittest
import transaction
from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from webtest import TestApp

from models import DBSession, Base, User

from ligando.views.views import my_view, test_view, faq, info, contact, news, hla_atlas, hla_atlas_classII

from pyramid import testing

here = os.path.dirname(__file__)
settings = appconfig('config:' + os.path.join(here, '../', 'development.ini'))


class BaseTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.engine = engine_from_config(settings, prefix='sqlalchemy.', pool_size=20, max_overflow=100)
        cls.Session = sessionmaker()

    def setUp(self):
        connection = self.engine.connect()

        # begin a non-ORM transaction
        self.trans = connection.begin()

        # bind an individual Session to the connection
        DBSession.configure(bind=connection)
        self.session = self.Session(bind=connection)
        Base.session = self.session

    def tearDown(self):
        # rollback - everything that happened with the
        # Session above (including calls to commit())
        # is rolled back.
        testing.tearDown()
        self.trans.rollback()
        self.session.close()


class UnitTestBase(BaseTestCase):
    def setUp(self):
        self.config = testing.setUp(request=testing.DummyRequest())
        super(UnitTestBase, self).setUp()

    def get_csrf_request(self, post=None):
        csrf = 'abc'

        if not u'csrf_token' in post.keys():
            post.update({
                'csrf_token': csrf
            })

        request = testing.DummyRequest(post)

        request.session = Mock()
        csrf_token = Mock()
        csrf_token.return_value = csrf

        request.session.get_csrf_token = csrf_token

        return request


class IntegrationTestBase(BaseTestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = main({}, **settings)
        super(IntegrationTestBase, cls).setUpClass()

    def setUp(self):
        self.app = TestApp(self.app)
        self.config = testing.setUp()
        # using the standard route_adder to check if works correctly
        self.config = route_adder(self.config)
        super(IntegrationTestBase, self).setUp()


class TestViews(IntegrationTestBase):
    def test_test_view(self):
        # test if site is accessible and added as routine
        res = self.app.get('/test_view')
        self.assertEqual(res.status_int, 200)
        # test for content of result dict
        request = testing.DummyRequest()
        response = test_view(request)
        self.assertIn("test", response)
        self.assertEqual(response["test"], [])
        self.assertEqual(response["count"], 0)

    def test_home(self):
        # test if site is accessible and added as routine
        res = self.app.get('/')
        self.assertEqual(res.status_int, 200)
        # test for content of result dict
        request = testing.DummyRequest()
        response = my_view(request)
        self.assertItemsEqual(response,
                              ["sources_count", "trash_count", "sources", "all_msrun_count", "orphan_msrun_count",
                               "orphan_msrun"])
        self.assertNotEqual(response["sources_count"], 0)
        self.assertNotEqual(response["trash_count"], 0)
        self.assertIsInstance(response["sources"], str)



    def test_search(self):
        # test if site is accessible and added as routine
        res = self.app.post('/search', {"search_all": "test"})
        self.assertEqual(res.status_int, 200)
        # test for content of result dict
        request = testing.DummyRequest({"search_all": "test"})
        response = search_result(request)
        self.assertNotEqual(response, dict())
        self.assertItemsEqual(response.keys(),
                              ["dignity", "peptide", "organ", "treatment", "patient_id",
                               "person", "celltype", "histology", "msrun", "protein", "organism",
                               "hla", "location"])

    def test_source_overview(self):
        # test if site is accessible and added as routine
        res = self.app.post('/sources')
        self.assertEqual(res.status_int, 200)

        # test for content of result dict
        request = testing.DummyRequest()
        response = source_overview(request)
        self.assertNotEqual(response, dict())
        self.assertIn("project", response)
        # asserts that there are sources
        if len(eval(response['project'])) > 0:
            self.assertItemsEqual(eval(response['project'])[0].keys(), ["dignity", "metastatis",
                                                                        "organ", "prep_date", "treatment",
                                                                        "patient_id", "person", "celltype",
                                                                        "histology", "source_id", "organism",
                                                                        "location"])

    # TODO: Decide if needed anymore
    def test_peptide_query(self):
        # test if site is accessible and added as routine
        res = self.app.get('/peptide_query')
        self.assertEqual(res.status_int, 200)

        # test for content of result dict
        # request = testing.DummyRequest()
        # response = run_overview(request)
        # self.assertNotEqual(response, dict())
        # self.assertTrue("project" in response)

    def test_peptide(self):
        # test if site is accessible and added as routine
        res = self.app.get('/peptide/test')
        self.assertEqual(res.status_int, 200)

        # test for content of result dict
        request = testing.DummyRequest(matchdict={"peptide": "test"})
        response = peptide_page(request)
        self.assertItemsEqual(response.keys(),
                              ["hla_class1_A", "hla_class1_B", "hla_class1_C", "hla_class2_DPB", "hla_class2_DQA",
                               "hla_class2_DQB", "hla_class2_DRB", "ms_run_count", "peptide", "proteins", "psms",
                               "sources"])
        self.assertEqual(response["peptide"], "test")

    def test_protein(self):
        # test if site is accessible and added as routine
        res = self.app.get('/protein/test')
        self.assertEqual(res.status_int, 200)

        # test for content of result dict
        request = testing.DummyRequest(matchdict={"protein": "test"})
        response = protein_page(request)
        self.assertNotEqual(response, dict())
        self.assertItemsEqual(response.keys(), ["protein", "statistics", "sequence_start", "sequence_end", "sequences"])
        self.assertEqual(response["protein"], "test")

    def test_source(self):
        # test if site is accessible and added as routine
        res = self.app.get('/source/test')
        self.assertEqual(res.status_int, 200)

        # test for content of result dict
        request = testing.DummyRequest(matchdict={"source": "test"})
        response = source_page(request)
        self.assertNotEqual(response, dict())
        self.assertItemsEqual(response.keys(), ["source", "runs", "metadata", "statistic"])
        self.assertEqual(response["source"], "test")
        self.assertItemsEqual(eval(response["statistic"].strip("[]")).keys(), ["count_hits", "count_prot", "count_pep"])

    def test_source_id(self):
        # test if site is accessible and added as routine
        res = self.app.get('/source_id/test')
        self.assertEqual(res.status_int, 200)

        # test for content of result dict
        request = testing.DummyRequest(matchdict={"source_id": "test"})
        response = source_id_page(request)
        self.assertNotEqual(response, dict())
        self.assertItemsEqual(response.keys(), ["source", "runs", "metadata", "statistic"])
        self.assertEqual(response["source"], "test")
        self.assertItemsEqual(eval(response["statistic"].strip("[]")).keys(),
                              ["count_hits", "count_prot", "count_pep"])

        # TODO: Fix after implementation

    #    def test_hla(self):
    # test if site is accessible and added as routine
    #        res = self.app.get('/hla/test')
    # self.assertEqual(res.status_int, 200)
    #
    # # test for content of result dict
    # request = testing.DummyRequest(matchdict={"hla": "test"})
    # response = hla_page(request)
    # self.assertNotEqual(response, dict())
    # self.assertTrue("source" in response)
    # self.assertEqual(response["source"], "test")
    # self.assertTrue("runs" in response)
    # self.assertTrue("metadata" in response)
    # self.assertTrue("statistic" in response)
    # self.assertItemsEqual(response.keys(), ["source", "runs", "metadata", "statistic"])
    # self.assertItemsEqual(eval(response["statistic"].strip("[]")).keys(),
    #                       ["count_hits", "count_prot", "count_pep"])

    def test_msrun(self):
        # test if site is accessible and added as routine
        res = self.app.get('/msrun/test')
        self.assertEqual(res.status_int, 200)

        # test for content of result dict
        request = testing.DummyRequest(matchdict={"msrun": "test"})
        response = msrun_page(request)
        self.assertNotEqual(response, dict())
        self.assertItemsEqual(response.keys(), ["msrun", "metadata", "statistics"])
        self.assertEqual(response["msrun"], "test")
        self.assertItemsEqual(eval(response["statistics"].strip("[]")).keys(),
                              ["count_hits", "count_prot", "count_pep"])
        self.assertItemsEqual(eval(response["metadata"].strip("[]").replace("null", "None")).keys(),
                              ["comment", "dignity", "sample_mass", "hla_typing", "organ", "msrun_comment",
                               "used_share",
                               "treatment", "patient_id", "person", "metastatis", "celltype", "histology",
                               "sample_volume",
                               "source_id", "antibody_set", "antibody_mass", "filename", "organism", "ms_run_date",
                               "location"])

    def test_organ(self):
        # test if site is accessible and added as routine
        res = self.app.get('/organ/test')
        self.assertEqual(res.status_int, 200)

        # test for content of result dict
        request = testing.DummyRequest(matchdict={"organ": "test"})
        response = organ_page(request)
        self.assertNotEqual(response, dict())
        self.assertItemsEqual(response.keys(), ["organ", "sources", "statistic", "protein_stats"])
        self.assertEqual(response["organ"], "Test")
        self.assertItemsEqual(eval(response["statistic"].strip("[]")).keys(),
                              ["pep_count"])

    def test_venn_analysis(self):
        # GET
        # test if site is accessible and added as routine
        res = self.app.get('/venn_analysis')
        self.assertEqual(res.status_int, 200)

        # test for content of result dict
        request = testing.DummyRequest()
        response = venn_analysis(request)
        self.assertNotEqual(response, dict())
        self.assertItemsEqual(response.keys(), ["source_id", "antibody", "ms_runs", "patient_id"])

        # TODO: POST
        # POST
        # test if site is accessible and added as routine
        # res = self.app.post('/venn_analysis')
        # self.assertEqual(res.status_int, 500)

    def test_faq(self):
        # test if site is accessible and added as routine
        res = self.app.get('/faq')
        self.assertEqual(res.status_int, 200)
        # test for content of result dict
        request = testing.DummyRequest()
        response = faq(request)
        self.assertEqual(response, dict())

    def test_info(self):
        # test if site is accessible and added as routine
        res = self.app.get('/info')
        self.assertEqual(res.status_int, 200)
        # test for content of result dict
        request = testing.DummyRequest()
        response = info(request)
        self.assertEqual(response, dict())

    def test_contact(self):
        # test if site is accessible and added as routine
        res = self.app.get('/contact')
        self.assertEqual(res.status_int, 200)
        # test for content of result dict
        request = testing.DummyRequest()
        response = contact(request)
        self.assertEqual(response, dict())

    def test_news(self):
        # test if site is accessible and added as routine
        res = self.app.get('/news')
        self.assertEqual(res.status_int, 200)
        # test for content of result dict
        request = testing.DummyRequest()
        response = news(request)
        self.assertEqual(response, dict())

    def test_hla_atlas(self):
        # test if site is accessible and added as routine
        res = self.app.get('/hla_atlas')
        self.assertEqual(res.status_int, 200)
        # test for content of result dict
        request = testing.DummyRequest()
        response = hla_atlas(request)
        self.assertIsInstance(response, dict)
        # self.assertItemsEqual(response.keys(), ["hla_a", "hla_b", "hla_c", "class1"])
        # Asserts that at least one HLA is in the DB
        if len(eval(response["class1"])) > 0:
            self.assertItemsEqual(eval(response["class1"])[0].keys(),
                                  ["scored_peptides", "peptides", "samples", "hla"])

    def test_hla_atlas_classII(self):
        # test if site is accessible and added as routine
        res = self.app.get('/hla_atlas_classII')
        self.assertEqual(res.status_int, 200)
        # test for content of result dict
        request = testing.DummyRequest()
        response = hla_atlas_classII(request)
        self.assertIsInstance(response, dict)
        # self.assertItemsEqual(response.keys(), ["hla_dpb1", "hla_dpa1", "hla_dqa1", "hla_dqb1", "hla_drb1",
        #                                       "hla_drb3", "hla_drb4", "hla_drb5", "hla_drb6",
        #                                       "class2"])
        # Asserts that at least one HLA is in the DB
        if len(eval(response["class2"])) > 0:
            self.assertItemsEqual(eval(response["class2"])[0].keys(),
                                  ["scored_peptides", "peptides", "samples", "hla"])
