import React, { useEffect, useRef, useState } from 'react';
import dashjs from 'dashjs';

const LessonPlayVideo = () => {
    const videoRef = useRef(null);
    const [lessonData, setLessonData] = useState(null);
    const [addedSubtitles, setAddedSubtitles] = useState([]);

    useEffect(() => {
        const fetchLessonData = async () => {
            try {
                const response = await fetch('https://tamhoang-online-course.azurewebsites.net/api/v1/lessons/6', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setLessonData(data.data);
                } else {
                    console.error('Failed to fetch lesson data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching lesson data:', error);
            }
        };

        fetchLessonData();
    }, []);


    useEffect(() => {
        if (lessonData) {
            const protData = {
                'com.microsoft.playready': {
                    serverURL: lessonData.lessonStreamingProperty.playReadyUrlLicenseServer,
                    httpRequestHeaders: {
                        'Authorization': lessonData.lessonStreamingProperty.token
                    },
                    withCredentials: false,
                },
                'com.widevine.alpha': {
                    serverURL: lessonData.lessonStreamingProperty.widevineUrlLicenseServer,
                    httpRequestHeaders: {
                        'Authorization': lessonData.lessonStreamingProperty.token
                    },
                    withCredentials: false,
                }
            };

            const player = dashjs.MediaPlayer().create();
            player.initialize(videoRef.current, null, false);
            player.setProtectionData(protData);
            player.attachSource(lessonData.lessonStreamingProperty.urlStreamDashCsf);

            lessonData.lessonSubtitleProperties.forEach(subtitle => {
                // Check if a track element for this subtitle already exists
                const existingTrack = addedSubtitles.includes(subtitle.subtitleUrl);
                if (!existingTrack) {
                    fetch(subtitle.subtitleUrl)
                        .then(response => response.text())
                        .then(subtitleText => {
                            const newSrcSubtitle = URL.createObjectURL(new Blob([subtitleText], { type: 'text/vtt' }));

                            const track = document.createElement('track');
                            track.kind = 'subtitles';
                            track.src = newSrcSubtitle;
                            track.srclang = subtitle.language.split('-')[0];
                            track.label = subtitle.language.split('-')[1];
                            videoRef.current.appendChild(track);

                            // Add the subtitle URL to the list of added subtitles
                            setAddedSubtitles(prevSubtitles => [...prevSubtitles, subtitle.subtitleUrl]);
                        })
                        .catch(error => {
                            console.error('Error loading subtitle:', error);
                        });
                }
            });

            return () => {
                if (player) {
                    player.reset();
                }
            };
        }
    }, [lessonData]);


    return (
        <div className='video-player-container'>
            <video ref={videoRef} controls className='video-player'></video>
        </div>
    );
};

export default LessonPlayVideo;