import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";


inquirer
  .prompt([
    // Question (prompt)
    {
        message: 'Enter a URL to create a QR-code from: ',
        name: 'URL',
    }
  ])
  .then((answers) => {
    // Create QR image with the user's response
    var qr_img = qr.image(answers.URL);
    // Save the image 
    qr_img.pipe(fs.createWriteStream('./images/qr_image.png'));
    
    // Write the url to the specified file
    fs.writeFile('urls.txt', answers.URL, (err) => {
        if (err) throw err;
        console.log('File saved successfully!')
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
