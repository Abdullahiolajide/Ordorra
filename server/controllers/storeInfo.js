const Product = require("../models/Product");
const StoreInfos = require("../models/StoreInfos") ;


const setStoreInfo = async (req, res) => {
  try {
    const { fullname, whatsappNumber, phoneNumber, storeName, handle, storeBio, storeLogo } = req.body;

    const exists = await StoreInfos.findOne({ handle });
    if (exists) {
      return res.status(400).json({ message: 'Handle already taken' });
    }

    const newInfo = new StoreInfos({
      user: req.user.userId,
      fullname,
      whatsappNumber,
      phoneNumber,
      storeName,
      handle,
      storeBio,
      storeLogo
    });

    await newInfo.save();
    res.status(201).json(newInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getStoreInfo = async (req, res) => {
  try {
    const storeInfo = await StoreInfos.findOne({ user: req.user.userId });
    if (!storeInfo) {
      // Return empty result instead of error for new users
      return res.status(200).json(null); 
    }
    res.json(storeInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStore = async (req, res) => {
  try {
    const store = await StoreInfos.findOne({ handle: req.params.handle });
    if (!store) {
      return res.status(404).json({ message: "Store does not exist" });
    }

    const products = await Product.find({ ownerId: store.user }).sort({ createdAt: -1 });

    
    res.json({
      store,
      products
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const editStoreInfo = async (req, res) => {
  try {
    const { fullname, whatsappNumber, phoneNumber, storeName, handle, storeBio, storeLogo } = req.body;

    // check if handle is taken by someone else
    if (handle) {
      const existingHandle = await StoreInfos.findOne({ handle, user: { $ne: req.user.userId } });
      if (existingHandle) {
        return res.status(400).json({ message: 'Handle already taken' });
      }
    }

    const updated = await StoreInfos.findOneAndUpdate(
      { user: req.user.userId },
      { fullname, whatsappNumber, phoneNumber, storeName, handle, storeBio, storeLogo },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Store info not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  setStoreInfo,
  getStoreInfo,
  editStoreInfo,
  getStore
}