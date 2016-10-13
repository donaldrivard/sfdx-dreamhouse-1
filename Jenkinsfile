#!groovy
import groovy.json.JsonSlurperClassic
node {

    def SERIAL = System.currentTimeMillis()
    def BRANCH = env.BRANCH_NAME.replaceAll(/[\/\\]/, '')
    def BUILD_NUMBER=env.BUILD_NUMBER
    def RUN_ARTIFACT_DIR="tests/${BUILD_NUMBER}"
    def SFDC_USERNAME="ci-${BRANCH}-${SERIAL}-pr@dhci.com"
    def CONNECTED_APP_CALLBACK_URL=env.CONNECTED_APP_CALLBACK_URL
    def SIGN_UP_EMAIL=env.SIGN_UP_EMAIL
    def API_VERSION=env.API_VERSION

        // Hard coding until pete can repair the damage
    // def HUB_ORG=env.HUB_ORG_DH
    // def HUB_KEY=env.HUB_KEY_FILE_PATH
    // def SFDC_HOST = env.SFDC_HOST
    // def CONNECTED_APP_CONSUMER_KEY=env.CONNECTED_APP_CONSUMER_KEY
    def HUB_ORG="wade.wegner@acdxgs0hub.org"
    def HUB_KEY="jenkins/server_adcxgs0hub.my.salesforce.com.key"
    def SFDC_HOST="https://adcxgs0hub.my.salesforce.com"
    def CONNECTED_APP_CONSUMER_KEY="3MVG9SemV5D80oBfPBCgboxuJ9df3F8MrzZxhqU5qeUb5MoRs.vuBNHRhhdMh2WDeh5cFiAXcv9z2PnZ7CScu"

    def toolbelt = tool 'toolbelt'

    stage('checkout source') {
        // when running in multi-branch job, one must issue this command
        checkout scm
    }

    // to save runtime - it is probably best that toolbelt be installed as a Jenkins setup step
    // rather than installing each time a job is run
    stage('Install Toolbelt') {
        rc = sh returnStatus: true, script: "${toolbelt}/sfdx force --help"
        if (rc != 0) {
            error 'sfdx not installed'
        }
    }

    stage('Create Scratch Org') {
        // modify workspace file to point to correct Salesforce App Server
        sh "mkdir -p ${RUN_ARTIFACT_DIR}"

        config = sprintf('''{
                "SfdcLoginUrl" : "%s",
                "ApiVersion" : "%s",
                "SourceApiVersion" : "36.0",
                "EnableTokenEncryption" : false,
                "DefaultArtifact" : "force-app"
                    }''', SFDC_HOST, API_VERSION)

        writeFile encoding: 'utf-8', file: 'workspace-config.json', text: config

        rc = sh returnStatus: true, script: "${toolbelt}/sfdx force:org:authorize -i ${CONNECTED_APP_CONSUMER_KEY} -u ${HUB_ORG} -f ${HUB_KEY} -y debug"
        if (rc != 0) { error 'hub org authorization failed' }

        // need to pull out assigned username 
        rmsg = sh returnStdout: true, script: "${toolbelt}/sfdx force:org:create -f config/workspace-scratch-def.json -j -t test -y debug"
        printf rmsg
        def jsonSlurper = new JsonSlurperClassic()
        def robj = jsonSlurper.parseText(rmsg)
        if (robj.status != "ok") { error 'org creation failed: ' + robj.message }
        SFDC_USERNAME=robj.username
        robj = null
        
    }

    stage('Push To Test Org') {
        rc = sh returnStatus: true, script: "${toolbelt}/sfdx force:src:push --all --targetname ${SFDC_USERNAME} -y debug"
        if (rc != 0) {
            error 'push all failed'
        }
        // assign permset
        rc = sh returnStatus: true, script: "${toolbelt}/sfdx force:permset:assign --targetname ${SFDC_USERNAME} --name DreamHouse -y debug"
        if (rc != 0) {
            error 'push all failed'
        }
    }

    stage('Run Apex Test') {
        timeout(time: 120, unit: 'SECONDS') {
            rc = sh returnStatus: true, script: "${toolbelt}/sfdx force:apex:test --testlevel RunLocalTests --testartifactdir ${RUN_ARTIFACT_DIR} --reporter tap --targetname ${SFDC_USERNAME} -y debug"
            if (rc != 0) {
                error 'apex test run failed'
            }
        }
    }

    stage('collect results') {
        junit keepLongStdio: true, testResults: 'tests/**/*-junit.xml'
    }
}
