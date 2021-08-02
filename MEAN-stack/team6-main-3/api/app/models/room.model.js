module.exports = mongoose => {

    const Room = mongoose.model(
      "room",
      mongoose.Schema(
        {
          address: String,
          description: String,
          price: String,
          availability: String,
          image:String,
          lease_period:String
        
        },
        { timestamps: true },
      )
    );
  
    return Room;
  };