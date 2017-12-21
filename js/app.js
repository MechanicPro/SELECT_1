var app = angular.module("App", []);

app.controller("Ctrl", function($scope, $http)
{    
    function initVar()
    {
        $scope.fileJSON = "data.json";
        $scope.score =
        {
            value_1 : 0,
            value_2 : 0
        };      
        $scope.IncorrectChoice =
        {
            value_1 : 0,
            value_2 : 0
        };  
        $scope.lenghtTask = 0;          
        $scope.correctAnsw = 0;        
        $scope.wrongAnsw = 0;        
        $scope.selectedModelCh = 'NO';
        
        $scope.listOfTask =
        {
            value_1 : JSON.parse(localStorage.getItem('task')),
            value_2 : JSON.parse(localStorage.getItem('task'))
        };
    }   
    
    initVar();
    init();
    
    $scope.resetAll = function()
    {   
        localStorage.clear();
        initVar();
        init();          
    };
    
    $scope.calcScore = function(selected, checkValue)
    {    
        //console.log("checkValue = " + checkValue); 
        //console.log("selected = " + selected.correct);
        if(selected)
        {
            if(checkValue === 'noCheck')
            {            
                if(selected.correct === "true")
                {
                    $scope.score.value_1++;                      
                }
                else
                {
                    $scope.IncorrectChoice.value_1++; 
                }
                var index = $scope.listOfTask.value_1.indexOf(selected);
                $scope.listOfTask.value_1.splice(index, 1);
            }
            else
            {
                if(checkValue === 'YES')
                {
                    if(selected.correct === "true")
                        $scope.score.value_2++;         
                    else
                        $scope.IncorrectChoice.value_2++;
                }
                else
                {
                    if(selected.correct === "true")
                        $scope.score.value_2--;         
                    else
                        $scope.IncorrectChoice.value_2--;
                }
        }
    }
    };
   
   function init()
   {  
       if (!$scope.listOfTask.value_1 && !$scope.listOfTask.value_2) 
       {
            $http.get($scope.fileJSON).success
            (
                function (data) 
                {
                    $scope.listOfTask.value_1 = data.task;
                    $scope.listOfTask.value_2 = data.task;
                    $scope.lenghtTask = $scope.listOfTask.value_2.length;                    
                    localStorage.setItem( 'task', JSON.stringify(data.task));  
                    for(var i = 0; i < $scope.lenghtTask; i++)
                    {
                        if($scope.listOfTask.value_2[i].correct === "true")            
                            $scope.correctAnsw++;             
                        else
                            $scope.wrongAnsw++;
                    }
                }
            );  
       }  
        else
        {
            $scope.Pr = Object.getOwnPropertyNames($scope.listOfTask);  //Взять свойства полей  
            $scope.lenghtTask = $scope.listOfTask.value_2.length;   
            for(var i = 0; i < $scope.lenghtTask; i++)
            {
                if($scope.listOfTask.value_2[i].correct === "true")            
                    $scope.correctAnsw++;             
                else
                    $scope.wrongAnsw++;
            }
        }       
    }
  }            
);
