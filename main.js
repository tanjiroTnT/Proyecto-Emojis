Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});
camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){

        Webcam.snap(function(data_uri){
            document.getElementById("result").innerHTML='<img id="captures_image" src="'+data_uri+'"/>';

    });
 
}
    console.log('ml5 version', ml5.version);

    classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/4F10uAQG8/model.json',modelLoaded);

    function modelLoaded(){
        console.log('Model Loaded!');
    }

    function check()
    {
        img=document.getElementById('captures_image');
        classifier.classify(img, gotResult);
    }

    function speak(){
        var synth=window.speechSynthesis;
        speak_data_1="La primera prediccion es " + prediccion_1;
        speak_data_2="Y la segunda prediccion es " + prediccion_2;
        var utterThis=new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
        synth.speak(utterThis);
    }


    function gotResult(error, results) {
        if (error){
            console.error(error);
        }else{
            console.log(results);
            document.getElementById("result_emotion_name").innerHTML=results[0].label;
            document.getElementById("result_emotion_name2").innerHTML=results[1].label;
            prediccion_1=results[0].label;
            prediccion_2=results[1].label;
            speak();
            if(results[0].label=="ok")
            {
                document.getElementById("update_emoji").innerHTML="&#128076;";
            }
            if(results[0].label=="Me agrada")
            {
                document.getElementById("update_emoji").innerHTML="&#128077;";
            }
            if(results[0].label=="Me desagrada")
            {
                document.getElementById("update_emoji").innerHTML="&#128078;";
            }
            if(results[1].label=="ok")
            {
                document.getElementById("update_emoji2").innerHTML="&#128076;";
            }
            if(results[1].label=="Me agrada")
            {
                document.getElementById("update_emoji2").innerHTML="&#128077;";
            }
            if(results[1].label=="Me desagrada")
            {
                document.getElementById("update_emoji2").innerHTML="&#128078;";
            }
        }
    }