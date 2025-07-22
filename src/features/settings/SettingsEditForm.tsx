import InputField from "@/components/InputField";
import Separator from "@/components/Separator";
import { Flex } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useSettings } from "./useSettings";
import * as Yup from "yup";
import { useUpdateSettings } from "./useUpdateSettings";
import { Tooltip } from "@/components/ui/tooltip";
import Button from "@/components/Button";

const settingsFormValidation = Yup.object().shape({
  minBookingLength: Yup.number()
    .min(1, "Minimum booking length must be at least 1 night")
    .required("Minimum booking length is required"),

  maxBookingLength: Yup.number()
    .min(
      Yup.ref("minBookingLength"),
      "Maximum booking length must be greater than or equal to the minimum",
    )
    .required("Maximum booking length is required"),

  maxGuestsPerBooking: Yup.number()
    .min(1, "Maximum guests per booking must be at least 1")
    .required("Maximum guests is required"),

  breakfastPrice: Yup.number()
    .min(0, "Breakfast price cannot be negative")
    .required("Breakfast price is required"),
});

const SettingsEditForm = () => {
  const { settings, isLoading } = useSettings();
  const { mutate, isPending } = useUpdateSettings();

  const initialSettingsValues = {
    minBookingLength: settings?.minBookingLength || 1,
    maxBookingLength: settings?.maxBookingLength || 1,
    maxGuestsPerBooking: settings?.maxGuestsPerBooking || 1,
    breakfastPrice: settings?.breakfastPrice || 1,
  };

  const handleSubmit = (values: typeof initialSettingsValues) => {
    mutate(values);
  };

  const formik = useFormik({
    initialValues: initialSettingsValues,
    onSubmit: handleSubmit,
    validationSchema: settingsFormValidation,
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputField
        name="minBookingLength"
        value={formik.values.minBookingLength}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        type="number"
        label="Minimum nights/bookings"
        labelWidth="12rem"
        maxWidth="22rem"
        errorMessage={formik.errors.minBookingLength}
        invalid={
          !!formik.errors.minBookingLength && formik.touched.minBookingLength
        }
        disabled={isLoading || isPending}
      />
      <Separator marginY="4" />
      <InputField
        name="maxBookingLength"
        value={formik.values.maxBookingLength}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        type="number"
        label="Maximum nights/bookings"
        labelWidth="12rem"
        maxWidth="22rem"
        errorMessage={formik.errors.maxBookingLength}
        invalid={
          !!formik.errors.maxBookingLength && formik.touched.maxBookingLength
        }
        disabled={isLoading || isPending}
      />
      <Separator marginY="4" />
      <InputField
        name="maxGuestsPerBooking"
        value={formik.values.maxGuestsPerBooking}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        type="number"
        label="Maximum guests/bookings"
        labelWidth="12rem"
        maxWidth="22rem"
        errorMessage={formik.errors.maxGuestsPerBooking}
        invalid={
          !!formik.errors.maxGuestsPerBooking &&
          formik.touched.maxGuestsPerBooking
        }
        disabled={isLoading || isPending}
      />
      <Separator marginY="4" />
      <InputField
        name="breakfastPrice"
        value={formik.values.breakfastPrice}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        type="number"
        label="Breakfast price"
        labelWidth="12rem"
        maxWidth="22rem"
        errorMessage={formik.errors.breakfastPrice}
        invalid={
          !!formik.errors.breakfastPrice && formik.touched.breakfastPrice
        }
        disabled={isLoading || isPending}
      />
      <Flex justifyContent="end" marginTop="6">
        <Tooltip
          content="Change one settings to update"
          disabled={formik.dirty}
          openDelay={300}
          closeDelay={300}
        >
          <Button
            type="submit"
            disabled={isLoading || !formik.dirty}
            loading={isPending}
          >
            Update settings
          </Button>
        </Tooltip>
      </Flex>
    </form>
  );
};

export default SettingsEditForm;
