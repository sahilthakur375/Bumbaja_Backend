import Template from '../models/templates.js';
import { sendSuccessMessage, senderrorMessage } from '../utils/responseHelper.js';

export const templates = async (req, res) => {
    try {
      const { type, name, description, htmlContent } = req.body;
  
      if (!type || !name || !description || !htmlContent) {
        return senderrorMessage(res,req,400,"missingFields")
      }
  
      // Generate template ID using template literals
  
      // Respond with success message and template ID
      // res.status(200).json({
      //   success: true,
      //   message: 'Template exported successfully',
      //   templateId: templateId,
      //   data: { type, templates }
      // });
      // const data = ({templateId,
      //   data: { type, templates }})
      const response = await Template.create(req.body)

      return sendSuccessMessage(res,req, 200, "templateCreated",(response));
  
    } catch (error) {
        return senderrorMessage(res,200,error.message);
    }
};
  export const getTemplateInfo = async (req, res) => {
   
    try {
    
      const user = await Template.findAll();
      if (!user) {
       return senderrorMessage(res,req,404, "templateNotFound");
      }
     return sendSuccessMessage(res,req,200, "fetchedDetails",user )
    } catch (err) {
      senderrorMessage(res,500, err.message )
    }
};
