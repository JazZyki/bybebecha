# Gulp task runner

It compiles SCSS, minifies JS files and uploads them, with images folder to FTPs server, on whitch runs WordPress/Shoptet instalation. It ensure better work with scss and JS/jQuery on wordpress.

**Steps to go:**
 1) Clone the repo
 2) Install node.js
 3) In root of project folder run terminal and run: `npm install` to install all packages needed to compile files
 4) in the root of project create .env file
 5) the .env file mus contain folowing:
    FTP_HOST="your.ftp.address"
    FTP_USER="your_user_name"
    FTP_PASS="your_password"
    FTP_PATH="/pave_template/"
 6) Save the .env file
 7) In terminal run: `npx gulp watchDeploy`
 8) After every save will automaticaly compile and upload the changes to server you defined in .env file. Your deploy was seccesfull whne you will see:
 `gulp-sftp: Uploaded: bundle.min.js => /pave_template/bundle.min.js`
 `gulp-sftp: Uploaded: bundle.min.js.map => /pave_template/bundle.min.js.map`
 `gulp-sftp: Uploaded: style.min.css => /pave_template/style.min.css`
 `gulp-sftp: Uploaded: style.min.css.map => /pave_template/style.min.css.map`
 **`gulp-sftp: 4 files uploaded successfully`**
 `
 9) after all work done, just in terminal press `Ctrl + C`
 10) **HAPPY CODING**