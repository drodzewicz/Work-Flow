import { FaUser } from "react-icons/fa";

import { useGetCurrentUser } from "@/service/self";

import Image from "@/components/general/Image";

import Modal from "@/components/layout/Modal";
import ProfileSectionCard from "@/components/layout/ProfileSectionCard/ProfileSectionCard";

import ChangeAvatar from "@/dialogs/ChangeAvatar";
import useBoolean from "@/hooks/useBoolean";

const ProfileSection = () => {
    const { data: user } = useGetCurrentUser();
    const {
        state: showChangeAvatarDialog,
        setTrue: openChangeAvatarDialog,
        setFalse: closeChangeAvatarDialog,
    } = useBoolean(false);

    return (
        <ProfileSectionCard className="profile-page__profile" title="Profile" Icon={FaUser}>
            <div className="profile-page__profile__primary">
                <div
                    onClick={openChangeAvatarDialog}
                    className="profile-page__profile__avatar-wrapper"
                >
                    <Image className="profile-page__profile__avatar" src={user?.avatarImageURL} />
                </div>
                <Modal
                    show={showChangeAvatarDialog}
                    title="Change Avatar"
                    size="s"
                    onClose={closeChangeAvatarDialog}
                >
                    <ChangeAvatar onSuccess={closeChangeAvatarDialog} />
                </Modal>
                <h3 className="profile-page__profile__username">{user?.username}</h3>
            </div>
            <div className="profile-page__profile__details">
                <p>{user?.email}</p>
                <p>{user?.name}</p>
                <p>{user?.surname}</p>
            </div>
        </ProfileSectionCard>
    );
};

export default ProfileSection;
