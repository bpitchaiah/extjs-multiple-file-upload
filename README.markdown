# Getting Started

1. install [twisted](http://twistedmatrix.com/)
    1. mkdir ~/pymodules
    1. export PYTHONPATH="$PYTHONPATH:$HOME/pymodules"
    1. tar xvjf twisted...tar.bz2
    1. mv Twisted.../twisted "$HOME/pymodules"
    1. you might need to do the same with Zope.Interface
1. copy over extjs files
    - you may want to use dep.sh
1. start twistd
    - `twistd -n web --port=8081 --path=.`
1. visit http://localhost:8081/demo.html

