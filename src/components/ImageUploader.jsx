
import { useRef, useState, useEffect } from 'react'
import { Camera, X, Upload } from 'lucide-react';
import './ImageUploader.css'

function ImageUploader({ onUpload, loading }) {
    const [preview, setPreview] = useState(null)
    const [dragActive, setDragActive] = useState(false)
    const [isCameraOpen, setIsCameraOpen] = useState(false)
    const [cameraError, setCameraError] = useState(null)

    const inputRef = useRef(null)
    const videoRef = useRef(null)
    const streamRef = useRef(null)

    // Cleanup stream on unmount
    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    const handleFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreview(e.target.result)
                onUpload(file, e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const startCamera = async () => {
        try {
            setCameraError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' } // Prefer back camera
            });
            streamRef.current = stream;
            setIsCameraOpen(true);

            // Wait for next render to set srcObject
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            }, 0);

        } catch (err) {
            console.error("Camera Error:", err);
            setCameraError("Camera access denied or not available.");
        }
    }

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCameraOpen(false);
    }

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

            stopCamera();

            canvas.toBlob((blob) => {
                const file = new File([blob], "camera_capture.jpg", { type: "image/jpeg" });
                handleFile(file);
            }, 'image/jpeg');
        }
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    const handleClick = () => {
        inputRef.current?.click()
    }

    const clearPreview = () => {
        setPreview(null)
        if (inputRef.current) inputRef.current.value = ''
    }

    return (
        <div className="image-uploader-wrapper">
            <div
                className={`image-uploader ${dragActive ? 'drag-active' : ''} ${preview ? 'has-preview' : ''}`}
                onDragEnter={!isCameraOpen ? handleDrag : undefined}
                onDragLeave={!isCameraOpen ? handleDrag : undefined}
                onDragOver={!isCameraOpen ? handleDrag : undefined}
                onDrop={!isCameraOpen ? handleDrop : undefined}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    hidden
                />

                {isCameraOpen ? (
                    <div className="camera-view" style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
                        <video
                            ref={videoRef}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            playsInline
                            muted
                        />
                        <button
                            className="btn btn-secondary btn-sm"
                            onClick={(e) => { e.stopPropagation(); stopCamera(); }}
                            style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', border: 'none' }}
                        >
                            <X size={20} color="white" />
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={(e) => { e.stopPropagation(); captureImage(); }}
                            style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', width: '60px', height: '60px', padding: 0, border: '4px solid white' }}
                        >
                            <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%' }}></div>
                        </button>
                    </div>
                ) : preview ? (
                    <div className="upload-preview">
                        <img src={preview} alt="Preview" />
                        {loading && (
                            <div className="upload-loading">
                                <div className="spinner"></div>
                                <span>Analyzing waste...</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="upload-prompt" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div className="icon-group" style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
                                <Upload size={32} color="var(--primary-mint)" />
                            </div>
                        </div>

                        <h3>Upload Video or Image</h3>
                        <p>Drag & drop, browse, or use camera</p>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                            <button className="btn btn-primary btn-sm" onClick={handleClick}>
                                Browse Files
                            </button>
                            <button className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); startCamera(); }}>
                                <Camera size={16} style={{ marginRight: '0.5rem' }} /> Use Camera
                            </button>
                        </div>

                        {cameraError && <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '0.5rem' }}>{cameraError}</p>}
                    </div>
                )}
            </div>

            {preview && !loading && (
                <button className="btn btn-secondary btn-sm" onClick={clearPreview}>
                    Scan Something Else
                </button>
            )}
        </div>
    )
}

export default ImageUploader
