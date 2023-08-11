import express from 'express';
import { resultData } from '../data/index.js';
const router = express();
 router.use(express.json());
 
 //API END POINTS  ROUTES

 //get records
 router.route('/results').get(async (req, res) => {
    const results = await resultData.getAllResults();
    const totalRecord = await resultData.getTotalRecords();
    res.json({"results":results,"totalRecord":totalRecord});
})

 //get single record
 router.route('/get-single-record/:id').get(async (req, res) => {
   const id = req.params.id;
   const results = await resultData.getResultById(id);
   res.json(results);
})


//Add a new record
router.route('/add-new-record').post(async (req, res) => {
//console.log(req.body);
    const date = req.body.date,
     home_team = req.body.home_team.trim(),
     away_team = req.body.away_team.trim(),
     home_score = parseInt(req.body.home_score),
     away_score = parseInt(req.body.away_score),
     tournament = req.body.tournament.trim(),
     city = req.body.city.trim(),
     country = req.body.country.trim(),
     neutral = req.body.neutral;

  const results = await resultData.addNewResult(date,home_team,away_team,home_score,away_score,tournament,city,country,neutral);

  res.json(results);

});

//update record
router.route('/update-record/:id').put(async (req, res) => {

    const  id = req.params.id,
     date = req.body.date,
     home_team = req.body.home_team.trim(),
     away_team = req.body.away_team.trim(),
     home_score = parseInt(req.body.home_score),
     away_score = parseInt(req.body.away_score),
     tournament = req.body.tournament.trim(),
     city = req.body.city.trim(),
     country = req.body.country.trim(),
     neutral = req.body.neutral;

  const results = await resultData.updateResult(id,date,home_team,away_team,home_score,away_score,tournament,city,country,neutral);

  res.json(results);

});

 //delete
 router.route('/delete/:id').delete(async (req, res) => {
    const id = req.params.id;
    const results = await resultData.deleteResult(id);
    res.json(results);
})




//SITE ROUTES


//view records
router.route('/').get(async (req, res) => {
   res.render("index");
 });

 
 //create new record
 router.route('/new-record').get(async (req, res) => {
    res.render("create");
  });

 //update
 router.route('/edit?:id').get(async (req, res) => {
  res.render("update");
});

export default router;