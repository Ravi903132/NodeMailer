const nodemailer=require('nodemailer');
const Mailgen=require('mailgen');

const {EMAIL,PASSWORD} = require('../env.js');

const signup= async (req,res)=>{

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });


       let message={
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "ravikumarranjan89555@gmail.com, ravikumarranjan903132@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
       }


       transporter.sendMail(message).then((info)=>{
        return res.status(201)
        .json({
            msg:"you should recieve an email",
            info : info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
       }).catch(error=>{
        return res.status(500).json({error})
       })
    // res.status(201).json("signup successfully...!");
}

const getbill=(req,res)=>{
   

    // const { userEmail } = req.body;


    let config={
        service : 'gmail',
        auth:{
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : "Daily Mail",
            intro: "Your bill has arrived!",
            table : {
                data : [
                    {
                        item : "Nodemailer Stack Book",
                        description: "A Backend application",
                        price : "$10.99",
                    }
                ]
            },
            outro: "Looking forward to do more business"
        }
    }

    let mail = MailGenerator.generate(response);


    let message = {
        from : EMAIL,
        to : 'klucse2000031911@gmail.com',
        subject: "Place Order",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })


}

module.exports = {
    signup,
    getbill
}