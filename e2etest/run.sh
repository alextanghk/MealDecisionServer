function setup {
    
}

function run {

}

function destroy {

}

function main {

    destroy || true
    setup
    run
    destroy
}
BASEDIR=$(cd $(dirname "$0") && pwd)
(
    cd "${BASEDIR}"/..
    main $@
)