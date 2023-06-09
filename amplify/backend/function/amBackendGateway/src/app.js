
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const { PrismaClient } = require('./prisma-client')
const prisma = new PrismaClient()

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

//creat get method for items
app.post('/create-user', async function (req, res) {
  const { phoneNumber,firstName ,recoveryEmail , lastName,walletPin,bankName,bankAccountHolderName,accountNumber,isBeneficiary,isPvtOrg,isServiceProvider,walletIdBeneficiary,walletIdPvtOrg,walletIdServiceProvider,beneficiaryInfo,pvtOrgInfo,serviceProviderInfo} = req.body;
  const result = await prisma.users.create({
    data: {
       phoneNumber,
       firstName ,
       lastName,
       walletPin,
       bankName,
       bankAccountHolderName,
       accountNumber,
       isBeneficiary,
       isPvtOrg,
       isServiceProvider,
       walletIdBeneficiary,
       walletIdPvtOrg,
       walletIdServiceProvider,
       beneficiaryInfo,
       pvtOrgInfo,
       serviceProviderInfo,
       recoveryEmail,
      
    },
       include: {
          beneficiaryInfo: true, // Include the created beneficiary record in the response
        }
    
  });

  res.json({ success: 'post call succeed!', result })
});

app.patch('/create-user', async (req, res) => {
  const { phoneNumber } = req.body;
  const { firstName , lastName  ,recoveryEmail,walletPin,bankName,bankAccountHolderName,accountNumber,isBeneficiary,isPvtOrg,isServiceProvider,walletIdBeneficiary,walletIdPvtOrg,walletIdServiceProvider,beneficiaryInfo,pvtOrgInfo,serviceProviderInfo  } = req.body;

  try {
    const updatedUser = await prisma.users.update({
      where: { phoneNumber },
      data: { firstName , lastName ,recoveryEmail,walletPin,bankName,bankAccountHolderName,accountNumber,isBeneficiary,isPvtOrg,isServiceProvider,walletIdBeneficiary,walletIdPvtOrg,walletIdServiceProvider,beneficiaryInfo,pvtOrgInfo,serviceProviderInfo,
      beneficiaryInfo},
      include: {
        beneficiaryInfo: true // Include the updated beneficiary record in the response
      }

    });
    

    res.json({ success: 'patch call succeed!', updatedUser })
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});


app.post('/create-beneficiary', async function(req, res) {
  const phoneNumber = req.body.phoneNumber; // Extract phone number from the request body

  try {
    // Find the user based on the phone number
    const user = await prisma.users.findUnique({
      where: {
        phoneNumber: phoneNumber
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const beneficiary = await prisma.beneficiary.create({
      data: {
        Users: {
          connect: {
            id: user.id
          }
        }
      }
    });

    // Update the beneficiaryInfo field in the Users model
    const updatedUser = await prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        beneficiaryInfo: {
          connect: {
            beneficiaryId: beneficiary.beneficiaryId
          }
        }
      },
      include: {
        beneficiaryInfo: true // Include the updated beneficiary record in the response
      }
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create beneficiary' });
  }
});


app.post('/create-pvtOrg', async function(req, res) {
  const phoneNumber = req.body.phoneNumber; // Extract phone number from the request body

  try {
    // Find the user based on the phone number
    const user = await prisma.users.findUnique({
      where: {
        phoneNumber: phoneNumber
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const pvtOrg = await prisma.pvtOrg.create({
      data: {
        Users: {
          connect: {
            id: user.id
          }
        }
      }
    });

    // Update the pvtOrgInfo field in the Users model
    const updatedUser = await prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        pvtOrgInfo: {
          connect: {
            privateOrgId: pvtOrg.privateOrgId
          }
        }
      }
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create private organization' });
  }
});



app.post('/create-serviceProvider', async function(req, res) {
  const phoneNumber = req.body.phoneNumber; // Extract phone number from the request body

  try {
    // Find the user based on the phone number
    const user = await prisma.users.findUnique({
      where: {
        phoneNumber: phoneNumber
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const serviceProvider = await prisma.serviceProvider.create({
      data: {
        Users: {
          connect: {
            id: user.id
          }
        }
      }
    });

    // Update the serviceProviderInfo field in the Users model
    const updatedUser = await prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        serviceProviderInfo: {
          connect: {
            serviceProviderId: serviceProvider.serviceProviderId
          }
        }
      }
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create service provider' });
  }
});


app.post('/create-voucher', async function(req, res) {
  const { voucherAmount, PhoneNumberSP, PhoneNumberB, PhoneNumberPvtOrg, voucherRedeemed, voucherSPId, voucherBeneficiaryId, PvtOrgById} = req.body;
  
  try {
    const serviceProvider = await prisma.serviceProvider.findUnique({
      select: {
        where : {
          Users : {
            phoneNumber: PhoneNumberSP
          }

        }
        
      }
    });

    if (!serviceProvider) {
      return res.status(404).json({ error: 'Service provider not found' });
    }

    const beneficiary = await prisma.beneficiary.findFirst({
      select: {
        where : {
          Users : {
            phoneNumber: PhoneNumberB
          }

        }
        
      }
    });

    if (!beneficiary) {
      return res.status(404).json({ error: 'Beneficiary not found' });
    }

    const pvtOrg = await prisma.pvtOrg.findFirst({
      select: {
        where : {
          Users : {
            phoneNumber: PhoneNumberPvtOrg
          }

        }
        
      }
    });

    if (!pvtOrg) {
      return res.status(404).json({ error: 'Private organization not found' });
    }

    const voucher = await prisma.voucher.create({
      data: {
        voucherAmount: voucherAmount,
        voucherRedeemed,
        voucherSPId,
        voucherBeneficiaryId,
        PvtOrgById,
        ServiceProviderUser: {
          connect: {
            serviceProviderId: serviceProvider.serviceProviderId
          }
        },
        BeneficiaryUser: {
          connect: {
            beneficiaryId: beneficiary.beneficiaryId
          }
        },
        PvtOrgBy: {
          connect: {
            privateOrgId: pvtOrg.privateOrgId
          }
        }
      },
      include: {
        BeneficiaryUser: true,
        ServiceProviderUser: true,
        PvtOrgBy: true
      }
    });
    res.status(200).json(voucher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create voucher' });
  };

    // Update the AvailableVoucher array in the beneficiary
   try{ const updatedBeneficiary = await prisma.beneficiary.update({
      where: {
        beneficiaryId: voucherBeneficiaryId
      },
      data: {
        AvailableVoucher: {
          push: {
            voucherId: voucher.voucherId
          }
        }
      }
    });
    res.status(200).json(updatedBeneficiary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update beneficiary' });
  }

  try {
    // Update the VoucherRequested array in the service provider
    const updatedServiceProvider = await prisma.serviceProvider.update({
      where: {
        serviceProviderId: serviceProviderId
      },
      data: {
        VoucherRequested: {
          push: {
            voucherId: voucher.voucherId
          }
        }
      }
    });

    res.status(200).json(updatedServiceProvider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update service provider' });
  }

  try {
    // Update the VouchersCreated field in the pvtOrg
    const updatedPvtOrg = await prisma.pvtOrg.update({
      where: {
        privateOrgId: PvtOrgById
      },
      data: {
        VouchersCreated: {
          connect: {
            voucherId: voucher.voucherId
          }
        }
      }
    });
    res.status(200).json(updatedPvtOrg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update PvtOrg' });
  }
});


app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app