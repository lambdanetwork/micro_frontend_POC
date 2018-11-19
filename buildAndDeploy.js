const cmd=require('node-cmd');
const fs = require('fs')
const mainDir = __dirname+'/Services'
//npm install --prefix ./main_app/

// MAIN
main()
function main(){
    fs.readdir(mainDir, (err, folder) => {
        const arrOfFolderName = folder.filter(name => {
            if(name[0] === '.') return false
            if(name.split('.').length > 1) return false
            if(name === 'node_modules') return false
            if(name === 'express') return false
            if(name === 'etc') return false
            else return true
        })

        bundleReact(arrOfFolderName)
        .then(res => {
            copyBundleToExpressRoute(arrOfFolderName)
        })
        .catch(console.log)
    })
}


function bundleReact(arrOfFolderName){
    return new Promise(resolved => {
        function looping(arr){
            const foldername = arr[0]
            console.log(foldername)
            if(!foldername) return resolved()
            const string = 'npm run build --prefix ' + mainDir+'/'+foldername
            cmd.get(string, function(err, result,stderr) {
                console.log(err, result, stderr)
                looping(arr.slice(1))
            })
        }
        looping(arrOfFolderName)
    })
}

function copyBundleToExpressRoute(arrOfFolderName){
    // const foldername = arrOfFolderName[0]
    // if(!foldername) return resolve()
    arrOfFolderName.forEach(foldername => {
        const readPath = mainDir+'/'+foldername+'/dist/bundle.js'
        const targetFile = `${__dirname}/S3_BUILD_FILES/${foldername}/${foldername}__v1_0_0.js`
        console.log('readPath', readPath)

        fs.readFile(readPath, 'utf-8', (err, data) => {
            // console.log(data)
            fs.writeFile(targetFile, data, (err => {
               if (err) console.log('ERR', err)
            }))
        })    
    })
}







