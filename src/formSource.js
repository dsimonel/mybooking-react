export function UserInputs(t) {
  return [
    {
      id: "username",
      label: t("username"),
      type: "text",
      placeholder: "john_doe",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "john_doe@gmail.com",
    },
    {
      id: "phone",
      label: t("phone"),
      type: "text",
      placeholder: "+1 234 567 89",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
    },
    {
      id: "country",
      label: t("country"),
      type: "text",
      placeholder: "USA",
    },
    {
      id: "city",
      label: t("city"),
      type: "text",
      placeholder: "USA",
    },
  ];
}
