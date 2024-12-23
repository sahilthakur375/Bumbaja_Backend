import Page from '../models/page.js';
import { sendSuccessMessage, senderrorMessage } from '../utils/responseHelper.js';

export const pages = async (req, res, next) => {
    try {
      const {type, title,description} = req.body;
      if (!type || !title || !description) {
        return senderrorMessage(res,req, 400, "invalidInput");
      }
      const response = await Page.create(req.body)
      return sendSuccessMessage(res,req,200,"dataAdded",(response));
    } catch (error) {
      return senderrorMessage(res,200,error.message);
    }
};
  export const getPageInfo = async (req, res) => {
    const {type} =req.body;
    try {
        if(!type){
          return senderrorMessage(res,req,400, "typeRequired");
        }
      const user = await Page.findOne({where:{type}});
      if (!user) {
       return senderrorMessage(res,req,404, "pageNotFound");
      }
     return sendSuccessMessage(res,req,200,"detailsFetched",user )
    } catch (err) {
      senderrorMessage(res,500, err.message )
    }
};
