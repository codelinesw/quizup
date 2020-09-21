import React from 'react';
import {
 BrowserRouter as Router,
 Switch,
 Route
} from  'react-router-dom';
import Register from './Screens/Register';
import ShowExams from './Screens/ShowExams';
import ShowResultExams from './Screens/ShowResultExams';
import ResultExams from './Screens/ResultExams';
import DescriptionExam from './Screens/DescriptionExam';
import ShowQuestions from './Screens/ShowQuestions';
import QuestionsMessage from './Screens/QuestionsMessage';

function App() {
  return (
     <Router>
        <Switch>
          <Route exact 
            path="/"
            component={Register}
           >
          </Route>
          <Route 
            path="/showexams/"
            component={ShowExams}
           />
          <Route 
            path="/descriptionexam/:question/:exam"
            component={DescriptionExam}
           /> 
          <Route 
            path="/showquestions/:question/:exam"
            component={ShowQuestions}
           />
          <Route 
            path="/questionsmessage/"
            component={QuestionsMessage}
           />            
          <Route 
            path="/showresultexams/"
            component={ShowResultExams}
           />
          <Route 
            path="/resultexams/"
            component={ResultExams}
           />                                                                                                                                                        
        </Switch>
      </Router>
  );
}

export default App;
