const cmd=require('node-cmd');
const fs = require('fs')
const mainDir = __dirname+'/Services'

main()
function main(){
    function installModules(arrOfFolderName){
        return new Promise(resolveInstallModules => {
            function loop(arrOfFolderName){
                const foldername = arrOfFolderName[0]
                if(!foldername) return resolveInstallModules()
                const string = 'npm install --prefix ' + mainDir+'/'+foldername
                console.log(`installing dependencies on ${foldername}`)
                cmd.get(string, function(result, err,stderr) {
                    console.log(err, result, stderr)
                    loop(arrOfFolderName.slice(1))
                })
            }
            loop(arrOfFolderName)
        })
    }
    return new Promise(resolve => {
        fs.readdir(mainDir, (err, folder) => {
            const arrOfFolderName = folder.filter(name => {
                if(name[0] === '.') return false
                if(name.split('.').length > 1) return false
                if(name === 'node_modules' || name === 'S3_BUILD_FILES') return false
                else return true
            })
            installModules(arrOfFolderName)
            .then(res => resolve())
        })
    })
}
