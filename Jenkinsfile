pipeline {

    agent any

    stages {

        stage('Verify Jenkins Environment') {

            steps {

                echo '======================================'
                echo 'Checking Jenkins Environment'
                echo '======================================'

                bat 'whoami'

                bat 'node -v'

                bat 'npm -v'

                bat 'git --version'

                echo 'Environment verification completed!'

            }

        }

    }

}