import * as S from "./UserBar.styles";

type Props = {
  username: string;
  email: string;
};

export function UserBar({ username, email }: Props) {
  return (
    <S.Bar>
      <span>
        שלום, <S.Strong>{username}</S.Strong> ({email})
      </span>
    </S.Bar>
  );
}
