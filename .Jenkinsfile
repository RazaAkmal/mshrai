node {
  stage('SCM') {
    checkout scm
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'SonarScanner';
    withSonarQubeEnv(installationName: 'sonar1') {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
}