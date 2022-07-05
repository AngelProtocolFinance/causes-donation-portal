// type KYCData = {
//   fullName: string;
//   email: string;
//   streetAddress: string;
//   city: string;
//   zipCode: string;
//   country: string;
// };
// const initialKYC: KYCData = {
//   fullName: "",
//   email: "",
//   streetAddress: "",
//   city: "",
//   zipCode: "",
//   country: "",
// };

//TODO: use react-hook-form on re-enabling
function KycForm() {
  return (
    <form className="p-4">
      <TextInput name="fullname" label="Full name" />
      <TextInput name="email" label="Email" />
      <TextInput name="streetAddress" label="Street address" />
      <TextInput name="city" label="City" />
      <TextInput name="zipCode" label="Zip code" />
      <TextInput name="country" label="Country" />
      <button className="uppercase text-sm font-extrabold bg-sky-600 hover:bg-sky-400 active:bg-sky-500 text-slate-50 w-full text-center p-2 rounded">
        submit
      </button>
    </form>
  );
}

function TextInput(props: { name: string; label: string }) {
  const _id = `__${props.name}`;
  return (
    <div className="grid mb-3 text-slate-700 mt-6 first:mt-0">
      <label
        htmlFor={_id}
        className="ml-0.5 text-angel-grey text-xs uppercase font-extrabold"
      >
        {props.label}
      </label>
      <input
        name={props.name}
        autoComplete="off"
        id={_id}
        type="text"
        className="p-1 pt-2 focus:outline-none border-b border-slate-600/20"
      />
    </div>
  );
}

export default KycForm;
