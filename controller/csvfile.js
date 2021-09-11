const CSVFILE = require("../model/csvfile");
const csv = require("csv-parser");
const fs = require("fs");
const notifier = require('node-notifier');
let fileList = [];

async function gettingDetails(fileName){
  return new Promise(function(resolve,reject){
    let fetchData = [];
    fs.createReadStream(fileName)
        .pipe(csv())
        .on('data', (data) => {
          fetchData.push(data);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            resolve(fetchData);
        })
        .on('error', reject); 
})
}

// action to create the file
module.exports.create = (req, res) => {
  let filepath;
  // uploading file by using the static variable
  // if(!req.file){
  //   return res.redirect("back");
  // }
  CSVFILE.uploadcsvfile(req, res, function (err){
    if(err) {
      return res.redirect("back");
    }
    if(req.file){
      filepath = CSVFILE.csvfilepath + "/" + req.file.filename;
    }

    // craetinf file in db
    CSVFILE.create({
        filepath: filepath,
        filename: req.file.filename,
      },
       (err, csvfile) => {
        if (err) {
          console.log("error while creating the file", err);
          return res.redirect("back");
        }
        //console.log("csvfile", csvfile);
        //going to the called page
        notifier.notify('File Uploaded');
        return res.redirect('back');
      }
    );
  });
};

module.exports.showfile = async (req, res) => {
  try{

      // fetching file by id 
      let csvfile=await CSVFILE.findById(req.query.id);

      // giving file with path 
      let filepath= __dirname+'/..'+csvfile.filepath;

      fileList = await gettingDetails(filepath);
    
     // extracting all props which is going to be our column
     const obj = fileList[0];
     var columnTitles = Object.keys(obj);
     console.log('object details: ',columnTitles);

      // rendering file view
      notifier.notify('File Details');
    return res.render('csvfile',
      {
           title:`${csvfile._id}`,
           data:fileList,
           headers:columnTitles
      });

  }catch(err){
    console.log('Error while uploading the file!',err);
    notifier.notify('Error while uploading the file!');
    return res.redirect('back');
  }
};

module.exports.search = async (req, res) => {
  try {
    // fetching file bi id
    let csvfile = await CSVFILE.findById(req.query.id);
    console.log("csvfile", csvfile);

    // parsing file
    let filepath = __dirname + "/.." + csvfile.filepath;
    console.log("file is present at ", filepath);
    await fs
      .createReadStream(`${filepath}`)
      .pipe(csv())
      .on("data", (data) => fileList.push(data))
      .on("end", () => {
        console.log(fileList);
      });

    var propNames = Object.keys(fileList[0]);
    let searchResults = [];
    let column = req.body.col;
    let val = req.body.name;

    console.log("searched", column, val);
    if (val) {
      for (data of fileList) {
        console.log("data of fileList", data);
        for (title of propNames) {
          console.log("data[column]", data[title]);
          if (data[title] == val){
            console.log("data", data); 
            searchResults.push(data)
          };
        }
      }
    } else {
      for (all of fileList) {
        searchResults.push(all);
      }
    }
    console.log("searchResults", searchResults);

    notifier.notify('Searched data from file');
    return res.render("search", {
      data: searchResults,
      headers: propNames,
    });
  } catch (err) {
    console.log("Error while Searching for the specific detail : ", err);
    notifier.notify('Error while getting the searched data from the file!');
    return res.redirect("back");
  }
};

