import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Register } from './components/Register'
import { ResetPass } from './components/ResetPass'
import { NewPass } from './components/ResetPass'
import { PaymentList } from './components/PaymentList'
import { Payment } from './components/Payment'
import { Login } from './components/Login'
import { Home } from './components/Home'
import { Verified } from './components/Verified'
import { NotFound } from './components/NotFound'
import { Error403 } from './components/NotFound'
import { Subscription } from './components/Subscription'
import { CountrySelect } from './components/CountrySelect'
import { MedioSelect } from './components/MedioSelect'
import { CourseSelect } from './components/CourseSelect'
import { Sala } from './components/Sala'
import { Course } from './components/Course'
import { CourseNew } from './components/Course'
import { CoursesList } from './components/CoursesList'
import { StudentList } from './components/Student'
import { Student } from './components/Student'
import { NewQuiz } from './components/Quiz'
import { QuizList } from './components/Quiz'
import { NewExam } from './components/Exams'
import { ExamList } from './components/Exams'
import { PdfViewer } from './components/PdfViewer'
import { ExamplePdfViewer } from './components/PdfViewer'
import { LinkUrl } from './components/Link'
import { LinkList } from './components/Link'
import { LinkView } from './components/Link'
import { FileList } from './components/File'
import { FileUrl } from './components/File'
import { ViewExam } from './components/ViewExam';

declare global { interface Window { Mercadopago: any } }
var Mercadopago = window.Mercadopago;

class App extends React.Component <{}, {}> {

	props: any
	static propTypes: any
	static defaultProps: any

	constructor(props: any) {
		super(props)
	}

	render() {

		return (
			<Router>
				<div>
					<Switch>
						
						<Route component={ CountrySelect } path='/countryselect' />
						<Route component={ MedioSelect } path='/medioselect' />
						<Route component={ CourseSelect } path='/courseselect' />
						<Route component={ Sala } path='/salaconfig' />

						<Route component={ StudentList } path='/studentList' />
						<Route component={ Student } path='/student' />

						<Route component={ PdfViewer } path='/pdfviewer' />
						
						<Route component={ QuizList } path='/quizlist' />
						<Route component={ NewQuiz } path='/newquiz' />

						<Route component={ NewExam } path='/newexam' />
						<Route component={ ExamList } path='/examlist' />
						<Route component={ ViewExam } path='/exam/:id' />

						<Route component={ LinkView } path='/link/:id' />
						<Route component={ LinkUrl } path='/link' />
						<Route component={ LinkList } path='/linkList' />
						<Route component={ FileUrl } path='/file' />
						<Route component={ FileList } path='/fileList' />
						<Route component={ Course } path='/course/:id' />
						<Route component={ CoursesList } path='/courseList' />
						<Route component={ CourseNew } path='/course' />
						<Route component={ Subscription } path='/subscription' />
						<Route component={ Verified } path='/verified/:id' />
						<Route component={ Register } path='/register' />
						<Route component={ ResetPass } path='/resetpass' />
						<Route component={ NewPass } path='/newpass/:user/:pass' />
						<Route component={ Home } path='/home' />
						<Route component={ NotFound } path='/notfound' />
						<Route component={ Error403 } path='/error403' />
						<Route component={ ExamplePdfViewer } path='/exa' />
						<Route component={ PdfViewer } path='/pdfviewer' />
						<Route component={ PaymentList } path='/paymentlist' />
						<Route component={ Payment } path='/payment' />
						<Route component={ Login } path='/' />
						<Route component={ NotFound } />
					
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App