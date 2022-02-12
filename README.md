# Image Processing Api
****
## Scripts to use:
- **to build the project**

        npm run build
- **to run the build**

        node dist/index.js
- **to run tests**

        npm run test
- **to run project using nodemon**
    
        npm run start

## Endpoint Architecture
 - **root endpoint**

        /
 - **api endpoint**
        
        /api
 - **images endpoint**

        /api/images
        /api/images?filename=filename&width=width&height=height
 -  ### Images endpoint example
    - Valid Request => return status code 200 and resized photo   


            http://localhost:3000/api/images?filename=palmtunnel&width=300&height=150
    - Filename missing => return status code 400

            http://localhost:3000/api/images?width=300&height=150
    - Filename invalid => return status code 400

            http://localhost:3000/api/images?filename=fake&width=300&height=150
    - Width missing => return status code 400

            http://localhost:3000/api/images?filename=palmtunnel&height=150
    - Height missing => return status 400

            http://localhost:3000/api/images?filename=palmtunnel&width=300
## Packages used
1. **express** as a webserver
2. **jasmine** for testing
3. **sharp** for image processing
4. **eslint** for linting
5. **prettier** for code formatting