import styles from "src/components/UserTag.module.css";

import type { User } from "src/api/users";

export type UserTagProps = {
  assignee?: User;
};

export function UserTag({ assignee }: UserTagProps) {
  if (assignee) {
    return (
      <div className={styles.tagContainer}>
        {assignee.profilePictureURL ? (
          <img className={styles.profilePicture} src={assignee.profilePictureURL}></img>
        ) : (
          <img className={styles.profilePicture} src="/userDefault.svg"></img>
        )}
        <p className={styles.text}>{assignee.name}</p>
      </div>
    );
  } else {
    return (
      <div className={styles.textContainer}>
        <p className={styles.text}>Not assigned</p>
      </div>
    );
  }
}
