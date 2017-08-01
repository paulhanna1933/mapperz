

const router = (req, res) => {
   const url = req.url;
   if(url === '/'){
      res.end('<h1>Hello World</h1>')
         }
   }

module.exports = router;
