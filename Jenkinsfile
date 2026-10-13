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
                echo 'Installing project dependencies'

                bat 'npm ci'

                echo 'Dependencies installed successfully'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                echo 'Installing Playwright Chromium browser'

                bat 'npx playwright install chromium'

                echo 'Chromium browser installation completed'
            }
        }

        stage('Run Registration Tests') {
            steps {
                echo 'Executing Playwright Registration Test Suite'

                bat 'npx playwright test tests/registration --project=chromium'

                echo 'Registration test execution completed'
            }
        }

    }
}