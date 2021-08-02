module.exports = mongoose => {

  const Requirement = mongoose.model(
    "requirement",
    mongoose.Schema(
      {
        first_name : String, //address
        last_name: String,//description
        course: String,//price
        phone_no: String,//availability
        country_name:String,//image
        gender:String//lease_period
      
      },
      { timestamps: true },
    )
  );

  return Requirement;
};