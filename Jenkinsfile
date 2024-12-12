pipeline {
    agent any

    environment {
        IMAGE_NAME = 'jenkins'          // Nombre de la imagen Docker
        CONTAINER_NAME = 'examen-despliegue'     // Nombre del contenedor
        CONTEXT_DIR = 'examen-despliegue'        // Carpeta donde están el Dockerfile y demás archivos
    }

    triggers {
        // Activar el pipeline automáticamente cuando se detecten cambios
        pollSCM('H/3 * * * *') // Verifica cambios cada 3 minutos
    }

    stages {
        stage('Checkout') {
            steps {
                // Clonar el repositorio
                checkout scm
                sh "ls -la ${CONTEXT_DIR}" // Verificar contenido del repositorio
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Construir la imagen Docker
                    sh "docker build -t ${IMAGE_NAME}:latest ${CONTEXT_DIR}"
                }
            }
        }


        stage('Deploy') {
            steps {
                script {
                    // Verificar si ya existe un contenedor en ejecución y detenerlo
                    sh """
                    if [ \$(docker ps -q -f name=${CONTAINER_NAME}) ]; then
                        docker stop ${CONTAINER_NAME}
                        docker rm ${CONTAINER_NAME}
                    fi
                    """

                    // Iniciar el nuevo contenedor
                    sh "docker run -d -p 5000:5000 --name ${CONTAINER_NAME} ${IMAGE_NAME}:latest"
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutado correctamente. Despliegue exitoso.'
        }
        failure {
            echo 'Error en el pipeline. Revisa los logs.'
        }
    }
}
