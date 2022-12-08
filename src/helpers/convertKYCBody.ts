export const convertKYCBody = (kycBody: any) => {
  const objKYCBody = {
    fullName: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  };

  objKYCBody.fullName = kycBody.fullName;
  objKYCBody.email = kycBody.email;
  objKYCBody.streetAddress = kycBody.streetAddress;
  objKYCBody.city = kycBody.city;
  objKYCBody.state = kycBody.state;
  objKYCBody.zipCode = kycBody.zipCode;
  objKYCBody.country = kycBody.country;

  return objKYCBody;
};
