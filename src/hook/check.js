class check {
    blankCheck = function(e){
        if (e.target.value == "" || e.target.value == null){
            e.prevantDefault();
            alert("빈칸 다 채우세요")
        } 
    }
}