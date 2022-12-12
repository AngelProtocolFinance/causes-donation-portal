import { useFormContext } from "react-hook-form";
import { FormValues as FV, PrevTx } from "../types";
import { Checkbox, Label } from "components/form";
import CountrySelector from "../CountrySelector";
import ExtLink from "components/ExtLink";
import { TERMS_OF_USE } from "constants/urls";
import TextInput, { errorStyle } from "../common/TextInput";
import useSubmit from "./useSubmit";
import maskAddress from "helpers/maskAddress";

export const formStyle =
  "w-full bg-gray-l5 dark:bg-blue-d5 text-gray-d2 dark:text-white font-work grid gap-6";

export default function Form({
  classes = "",
  hash,
}: PrevTx & { classes?: string }) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FV>();
  const submit = useSubmit({ hash });

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`${classes} ${formStyle}`}
      autoComplete="off"
      autoSave="off"
    >
      <p>
        <span className="text-xs uppercase font-bold mb-1">
          Transaction ID:
        </span>
        <span className="font-normal text-sm ml-2">{maskAddress(hash)}</span>
      </p>
      <TextInput<FV>
        name="name.first"
        label="First name"
        placeholder="e.g. John"
      />
      <TextInput<FV>
        name="name.last"
        label="Last name"
        placeholder="e.g. Doe"
      />
      <TextInput<FV>
        name="address.street"
        label="Address"
        placeholder="e.g. Street Rd 9920"
      />
      <TextInput<FV>
        name="address.complement"
        label="Address complement"
        placeholder="e.g. Street Rd 9920"
        required={false}
      />
      <TextInput<FV> name="city" label="City" placeholder="e.g. London" />
      <TextInput<FV>
        name="postalCode"
        label="Zip code"
        placeholder="e.g. 1080"
      />
      <div className="grid relative">
        <Label htmlFor="country" className="mb-2">
          Country
        </Label>

        <CountrySelector<FV, "country">
          placeholder="United Kingdom"
          fieldName="country"
          classes={{
            container:
              "px-4 border border-gray-l2 rounded focus-within:border-gray-d1 focus-within:dark:border-blue-l2 dark:border-bluegray bg-gray-l5 dark:bg-blue-d6",
            input:
              "py-3.5 w-full placeholder:text-sm placeholder:text-gray-d1 dark:placeholder:text-gray focus:outline-none bg-transparent",
            error: errorStyle,
          }}
        />
      </div>
      <TextInput<FV>
        name="state"
        label="State"
        required={false}
        placeholder="e.g. England"
      />
      <TextInput<FV>
        name="email"
        label="Email address"
        placeholder="e.g. johndoe@mail.com"
        classes={{ container: "col-span-full" }}
      />
      <Checkbox<FV>
        name="hasAgreedToTerms"
        classes={{
          container: `my-2 relative`,
          checkbox:
            "appearance-none border relative border-gray-d2 dark:border-white rounded w-4 h-4  checked:bg-orange",
          error: "mt-2",
        }}
      >
        I have read and I agree with{" "}
        <ExtLink className="underline text-orange" href={TERMS_OF_USE}>
          Terms & Conditions
        </ExtLink>
        .
      </Checkbox>

      <button
        className="col-span-full btn-orange uppercase font-bold px-4 py-2 rounded"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Processing..." : "Submit"}
      </button>
    </form>
  );
}
