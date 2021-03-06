/* view for the teachers list of currently created lesson plans */
var React = require('react'),
    Reflux = require('reflux'),
    ColorTable = require('ColorTable'),
    Colors = require('colors'),
    Button = require('react-bootstrap/lib/Button'),
    TeacherHomeworkStore = require('TeacherHomeworkStore'),
    _ = require('lodash'),
    FaIcon = require('react-fa');

/* Main page content */
module.exports = React.createClass({

    displayName: 'TeacherLessonPlansView',

    mixins: [
        Reflux.connect(TeacherHomeworkStore, 'TeacherHomeworkStore')
    ],

    /* handler for selected the create homework button */
    createLesson: function() {
        this.props.history.push('/teacherHomework/create');
    },

    /* callback handler for a table row being selected */
    rowSelected: function(row) {
        TeacherLessonPlanActions.loadLessonPlan(row.title, this.props.history);
    },

    componentWillMount: function() {
        TeacherLessonPlanActions.loadLessonPlans();
      },

    render: function() {
        /* create the table rows for the color table */
        var lessonPlans = this.state.TeacherHomeworkStore.allLessonPlans;
        var tableRows = _.map(lessonPlans, function(lessonPlan, index) {
            return {
                title: lessonPlan.title.toUpperCase(),
                date: new Date(lessonPlan.date).toLocaleDateString(),
                color: Colors.colorsArray[index % Colors.colorsArray.length],
                details: true,
                selectable: true
            };
        });

        return (
            <div id="teacherLessonPlanView">
                <div className='pageItem'>
                    <div id='titleHeader'>
                        <div className='pageHeader'>{'MY LESSON PLANS'}</div>
                        <Button bsStyle="info" onClick={this.createLesson}>{'CREATE LESSON'}</Button>
                    </div>
                </div>
                <div className='pageItem'>
                    {tableRows.length > 0 ?
                    	<ColorTable rows={tableRows} rowSelectedHandler={this.rowSelected}/>
                    :
                    	<div className='emptyView'>
                    		<FaIcon.Icon name='file'/> 
                    		<div className='emptyViewText'>{'NO LESSON PLANS HAVE BEEN CREATED. PLEASE CREATE A LESSON PLAN TO GET STARTED.'}</div>
                		</div>
                	}
                </div>
            </div>
        );
    }
});
