import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.txt')) as f:
    README = f.read()
with open(os.path.join(here, 'CHANGES.txt')) as f:
    CHANGES = f.read()

install_requires = [
        "pyramid==1.9.2",
        "pyramid_tm==2.2",
        "pyramid_chameleon==0.3",
        "PyMySQL==0.9.2",
        "pyopenms==2.2.0",
        "simplejson==3.16.0",
        "SQLAlchemy==1.2.10",
        "waitress==1.1.0",
        "zope.sqlalchemy==1.0"
]

setup(name='ligando',
      version='0.1',
      description='ligando',
      long_description=README + '\n\n' + CHANGES,
      classifiers=[
        "Programming Language :: Python",
        "Framework :: Pyramid",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
        ],
      author='Linus Backert',
      author_email='linus.backert@uni-tuebingen.de',
      url='',
      keywords='web wsgi bfg pylons pyramid',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      test_suite='HLA_Ligand_Atlas',
      install_requires=install_requires,
      entry_points="""\
      [paste.app_factory]
      main = ligando:main
      [console_scripts]
      initialize_ligando_db = ligando.scripts.initializedb:main
      """
)

