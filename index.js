const express=require("express")
const app=express();
const xlsxFile=require("read-excel-file/node");





app.get("/excel",function(req,res){


    xlsxFile("./report.xlsx",{getSheets:true}).then((sheets)=>{
        sheets.forEach((obj)=>{
          console.log(obj.name)
          
        })
    })

 
})




app.get("/paginas/:valor",function(req,res){
    
    xlsxFile("./report.xlsx",{sheet:req.params.valor}).then((rows)=>{
        for (i in rows){
            for(j in rows[i]){
                console.log(rows[i][j]);
            }
        }
    
    })
 
 })

 





app.listen(8800,()=>{
    console.log("servidor rodando...");
});

