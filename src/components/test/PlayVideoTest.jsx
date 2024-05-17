import React, { useEffect, useRef, useState } from 'react';
import dashjs from 'dashjs';
import './play-video-test.css'

const PlayVideoTest = () => {
    const videoRef = useRef(null);
    const [courseData, setCourseData] = useState(null);
    const [subtitleUrl, setSubtitleUrl] = useState(null);




    const [isCoursePurchased, setIsCoursePurchased] = useState(null);

    useEffect(() => {
        const courseId = // thay bằng courseid từ

        axios.get(`/api/v1/course/checkpurchased/${courseId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Sử dụng token từ localStorage
            },
        })
            .then((response) => {
                setIsCoursePurchased(response.data.IsCoursePurchased);
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra:', error);
            });
    }, []);





    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/course/get-course/6`);
                if (response.ok) {
                    const data = await response.json();
                    setCourseData(data.data);
                    setSubtitleUrl('https://tamhoangblobstorage001.blob.core.windows.net/container-hoangtamit20/CourseId-11/Subtitles/CourseId-30-subtitle-en.vtt');
                } else {
                    console.error('Failed to fetch course data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        fetchCourseData();
    }, []);

    useEffect(() => {
        if (courseData && subtitleUrl) {
            const protData = {
                'com.microsoft.playready': {
                    serverURL: courseData.courseUrlStreaming.playReadyUrlLicenseServer,
                    httpRequestHeaders: {
                        'Authorization': courseData.courseUrlStreaming.token
                    },
                    withCredentials: false,
                },
                'com.widevine.alpha': {
                    serverURL: courseData.courseUrlStreaming.widevineUrlLicenseServer,
                    httpRequestHeaders: {
                        'Authorization': courseData.courseUrlStreaming.token
                    },
                    withCredentials: false,
                }
            };

            const player = dashjs.MediaPlayer().create();
            player.initialize(videoRef.current, null, false);
            player.setProtectionData(protData);
            player.attachSource(courseData.courseUrlStreaming.urlStreamDashCsf);

            fetch(subtitleUrl)
                .then(response => response.text())
                .then(subtitleText => {
                    const newSrcSubtitle = URL.createObjectURL(new Blob([subtitleText], { type: 'text/vtt' }));
                    console.log(newSrcSubtitle);

                    // Check if a track element already exists
                    const existingTrack = videoRef.current.querySelector('track');
                    if (!existingTrack) {
                        const track = document.createElement('track');
                        track.kind = 'subtitles';
                        track.src = newSrcSubtitle;
                        track.srclang = 'en';
                        track.label = 'English';
                        videoRef.current.appendChild(track);
                    }
                })
                .catch(error => {
                    console.error('Error loading subtitle:', error);
                });
            return () => {
                if (player) {
                    player.reset();
                }
            };
        }
    }, [courseData, subtitleUrl]);

    return (
        <div className='video-player-container'>
            <video ref={videoRef} controls className='video-player'></video>
        </div>
    );
};

export default PlayVideoTest;
