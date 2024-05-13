import { Box } from "@mui/material";
import styles from "./CourseContent.module.scss";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarHalfIcon from "@mui/icons-material/StarHalf";

interface ICourse {
    id: number;
    courseName: string;
    price: number;
    thumbnail: string;
    isFree: null;
    weeklyViews: number;
    monthlyViews: number;
    creatorId: string;
    creatorName: string;
    creatorPicture: string;
}

const CourseContent = ({ course }: { course: ICourse }) => {
    return (
        <Box className={styles.content}>
            <Box className={styles.wrapper}>
                <img className={styles.pic} src={course.thumbnail} />
                <Box className={styles.body}>
                    <a
                        className={styles.courseLink}
                        href="/course/the-complete-web-development-bootcamp/"
                    >
                        {course.courseName}
                    </a>
                    <p className={styles.title}>{course.creatorName}</p>

                    <div className={styles.priceWrapper}>
                        <strong className={styles.price}>
                            ₫{course.price}
                        </strong>
                        <span className={styles.delPrice}>
                            <del>₫1,599,000</del>
                        </span>
                    </div>
                    <span className={styles.btn}>Bestseler</span>
                </Box>
            </Box>
        </Box>
    );
};

export default CourseContent;
