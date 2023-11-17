export type UpdateUserPayload = Partial<{
  email: string;
  name: string;
  surname: string;
}>;

export type UpdateUserAvatarPayload = {
  image: string;
};
