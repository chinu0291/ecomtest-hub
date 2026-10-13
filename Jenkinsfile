pipeline {

    agent any

    stages {

        stage('Verify Environment') {

            steps {

                echo 'Checking Node.js and npm versions'

                bat 'node -v'

                bat 'npm -v'

            }

        }

        stage('Install Dependencies') {

            steps {

                echo 'Installing Playwright project dependencies'

                bat 'npm ci'

                echo 'Dependencies installed successfully'

            }

        }

    }

}