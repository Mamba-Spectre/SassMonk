import React, { useState } from 'react';
import styles from './styles.module.css';
import Modal from '../Modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>("");

    const handleSubmit = async (formData: any) => {
        if (modalType === "movie") {
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/movies`,
                    formData
                );
                closeModal();
                router.refresh();
                location.reload();
            } catch (error:any) {
                toast.error(error || "Something went Wrong");
                console.error("Error submitting form:", error);
            }
        } else {
            console.log("Form data:", formData);
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
                    formData
                );
                closeModal();
                router.refresh();
                location.reload();
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
        closeModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setModalType("");
        setIsModalOpen(false);
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>MOVIECRITIC</div>
            <div className={styles.navLinks}>
                <button
                    className={styles.button}
                    onClick={() => {
                        openModal(), setModalType("movie");
                    }}
                >
                    Add new Movie
                </button>
                <button
                    className={styles.button}
                    onClick={() => {
                        openModal(), setModalType("Review");
                    }}
                >
                    Add new review
                </button>
            </div>
            {isModalOpen && (
                <Modal
                    closeModal={closeModal}
                    handleSubmit={handleSubmit}
                    modalType={modalType}
                />
            )}
        </div>
    );
};

export default NavBar;
