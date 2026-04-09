import * as S from "./UserBar.styles";

type Props = {
  username: string;
  email: string;
  onLogout: () => void;
};

export function UserBar({ username, email, onLogout }: Props) {
  return (
    <S.Bar>
      <span>
        שלום, <S.Strong>{username}</S.Strong> ({email})
      </span>
      <S.LogoutLink type="button" onClick={onLogout}>
        יציאה
      </S.LogoutLink>
    </S.Bar>
  );
}
