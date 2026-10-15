pipeline {
    agent any

        environment {
        EXISTING_TEST_EMAIL = credentials('4b0bbc4d-79c8-4320-9a12-0d19cb8c59cd')
    }

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
        bat 'npx playwright test tests/registration --project=chromium --grep "TC_REG_009"'
        echo 'Registration test execution completed'
    }
}

    }
}