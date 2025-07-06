package com.secureX.SecureX.service;

import org.bytedeco.javacv.*;
import org.bytedeco.opencv.opencv_core.*;
import org.bytedeco.opencv.global.opencv_objdetect;
import org.bytedeco.opencv.global.opencv_imgproc;
import org.bytedeco.opencv.opencv_objdetect.CascadeClassifier;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import static org.bytedeco.opencv.global.opencv_imgcodecs.imencode;

public class VideoStreamService {

    private OpenCVFrameGrabber grabber;
    private CascadeClassifier faceDetector;
    private CascadeClassifier eyeDetector;

    public VideoStreamService() {
        grabber = new OpenCVFrameGrabber(0);
        faceDetector = new CascadeClassifier("haarcascade_frontalface_default.xml");
        eyeDetector = new CascadeClassifier("haarcascade_eye.xml");

        try {
            grabber.start();
        } catch (FrameGrabber.Exception e) {
            e.printStackTrace();
        }
    }

    public byte[] getFrame() {
        try {
            Frame frame = grabber.grab();
            OpenCVFrameConverter.ToMat converter = new OpenCVFrameConverter.ToMat();
            Mat mat = converter.convert(frame);

            RectVector faces = new RectVector();
            faceDetector.detectMultiScale(mat, faces);

            for (int i = 0; i < faces.size(); i++) {
                Rect face = faces.get(i);
                opencv_imgproc.rectangle(mat, face, new Scalar(255, 255, 0, 1));
            }

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            imencode(".jpg", mat, outputStream.toByteArray());

            return outputStream.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return new byte[0];
        }
    }
}
