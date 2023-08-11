import {results} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

const resultsDataFunctions = {
  //fetch data from database  
async getAllResults(){

    try {

        //get results collection
        const resultCollection = await results();
        const resultObj= await resultCollection.find({}).limit(50).toArray();;
        //if no data found throw error
        if (!resultObj) throw 'No Results';
        //return data
        return resultObj;

    } catch (error) {
    throw error
    }
},

async getTotalRecords(){
  try {

      //get results collection
      const resultCollection = await results();
     // const resultObj= await resultCollection.countDocuments();
      const resultObj= await resultCollection.estimatedDocumentCount()
      //return data
      return resultObj;

  } catch (error) {
  throw error
  }
},

//fetch a single record
async getResultById(id){
    try {

        id = id.trim();

       //get results collection
       const resultsCollection = await results();

       //search for the results
       const resultsID = new ObjectId(id);
       const resultObj = await resultsCollection.find({ _id :resultsID}).toArray();

       //if no results throw error
       if (!resultObj) throw 'No results not found';

       //return  details
       return resultObj;

 } catch (error) {
   throw error
 }
},

//add new record
async addNewResult(date,home_team,away_team,home_score,away_score,tournament,city,country,neutral) {

        try {
    
              //insert data into mongo db
              let newResult = {
                    "date": date,
                    "home_team": home_team,
                    "away_team": away_team,
                    "home_score": home_score,
                    "away_score": away_score,
                    "tournament": tournament,
                    "city":city,
                    "country": country,
                    "neutral": neutral
                }
                const resultsCollection = await results();
                const newInsertInfo = await resultsCollection.insertOne(newResult);
                
                //if no insert occured throw error
                if (!newInsertInfo.insertedId) throw 'Insert failed!';
    
                return await this.getResultById(newInsertInfo.insertedId.toString());
    
          } catch (error) {
               throw error;
          }
},

//update a record
async updateResult(id,date,home_team,away_team,home_score,away_score,tournament,city,country,neutral) {

    
    try {

         const result_id = id.trim();
          const resultsID = new ObjectId(result_id);

            //Update   use $set to update only the fields specified
            const resultsCollection = await results();
            const upadteInfo = await resultsCollection
            .updateOne({ _id :resultsID}, 
              {$set:{
                    "date": date,
                    "home_team": home_team,
                    "away_team": away_team,
                    "home_score": home_score,
                    "away_score": away_score,
                    "tournament": tournament,
                    "city":city,
                    "country": country,
                    "neutral": neutral
                }});

            //return update object
            return upadteInfo;
        
      } catch (error) {
         throw error;
      }
},

//delete a record
async deleteResult (id){
    
    const getid = id.trim();

    const resultId = new ObjectId(getid);

    //delete record
    const resultCollection = await results();
    const deleteObj = await resultCollection.deleteOne({ _id : resultId});
    
    return deleteObj;
}

};

export default resultsDataFunctions;