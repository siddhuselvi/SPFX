import * as React from 'react';
import styles from './Dashboard.module.scss';
//import { IDashboardProps } from './IDashboardProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
export default class Dashboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      listData: [],
    totalCount1: 0,
    totalCountKG: 0,
    inProgressCountKG: 0,
    notStartedCountKG: 0,
    completedCountKG: 0,
    cancelledCountKG: 0,
    totalCountDeepa: 0,
    inProgressCountDeepa: 0,
    notStartedCountDeepa: 0,
    completedCountDeepa: 0,
    cancelledCountDeepa: 0,
    totalCountUmarani: 0,
    inProgressCountUmarani: 0,
    notStartedCountUmarani: 0,
    completedCountUmarani: 0,
    cancelledCountUmarani: 0,
    lastFiveDates: [],
    comingFiveDates: [],
   currentDate:[]
    };
  }
  public async componentDidMount() {
    // Fetch data from SharePoint list
  await  this.loadData();
  const currentDate = new Date();
    const lastFiveDates = this.calculateDateRange(currentDate, -5, -1);
    const comingFiveDates = this.calculateDateRange(currentDate, 1, 5);

    this.setState({
      lastFiveDates,
      comingFiveDates,
      currentDate
    });

  }
 
  private calculateDateRange(baseDate: Date, startOffset: number, endOffset: number): string[] {
    const dateSet: Set<string> = new Set();
    const dateRange: string[] = [];
  
    const addDate = (date: Date) => {
      const formattedDate = this.formatDate(date);
      if (!dateSet.has(formattedDate)) {
        dateRange.push(formattedDate);
        dateSet.add(formattedDate);
      }
    };
  
    for (let i = startOffset; i <= endOffset; i++) {
      const date = new Date(baseDate as any);
      date.setDate((baseDate as any).getDate() + i);
      addDate(date);
    }
  
    return dateRange;
  }
  


  private formatDate(date: Date) {
    const options = { day: '2-digit', month: 'short' } as const;
    return date.toLocaleDateString('en-US', options);
  }

  private getCurrentDate() {
  const currentDate = new Date();
  return this.formatDate(currentDate);
}

 

 private async loadData() {
    try {
      const listName = 'TaskDetails';
console.log("tp1",listName);
      //const apiUrl = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=Title,DueDate,Description,AssignedBy,AssignedTo,Priority,Dependencies,Status`;
    const apiUrl = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/items`;
      console.log("tp4",apiUrl);
      const response: SPHttpClientResponse = await this.props.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      const data = await response.json();
      if (response.ok) {
  // Assign a unique key to each item in the listData array
        const listDataWithKeys = data.value.map((item: any, index: number) => ({
          ...item,
          uniqueKey: index,
          Inprogress: parseInt(item.Inprogress, 10),
          NotStarted: parseInt(item.Notstarted, 10),
          Completed: parseInt(item.completed, 10), // Adjust field name if needed
          Cancelled: parseInt(item.Cancelled, 10),
        }));
        const totalCount1 = listDataWithKeys.length;
        //this.setState({ listData: listDataWithKeys, totalCount });
        //this.setState({ listData: listDataWithKeys });
        const totalInProgressCount = listDataWithKeys.reduce((sum: number, item: any) => sum + item.Inprogress, 0);
        const totalNotstartedCount = listDataWithKeys.reduce((sum: number, item: any) => sum + item.NotStarted, 0);
        const totalcompletedCount = listDataWithKeys.reduce((sum: number, item: any) => sum + item.Completed, 0);
        const totalCancelledCount = listDataWithKeys.reduce((sum: number, item: any) => sum + item.Cancelled, 0);

        const filteredListDataKG = listDataWithKeys.filter((item: any) => item.AssignedTo === "KG");
        const totalCountKG = filteredListDataKG.length;
        const inProgressCountKG = filteredListDataKG.reduce((sum: number, item: any) => sum + item.Inprogress, 0);
        const notStartedCountKG = filteredListDataKG.reduce((sum: number, item: any) => sum + item.NotStarted, 0);
        const completedCountKG = filteredListDataKG.reduce((sum: number, item: any) => sum + item.Completed, 0);
        const cancelledCountKG = filteredListDataKG.reduce((sum: number, item: any) => sum + item.Cancelled, 0);

        const filteredListDataDeepa = listDataWithKeys.filter((item: any) => item.AssignedTo === "Deepa Vinod");
        const totalCountDeepa = filteredListDataDeepa.length;
        const inProgressCountDeepa = filteredListDataDeepa.reduce((sum: number, item: any) => sum + item.Inprogress, 0);
        const notStartedCountDeepa = filteredListDataDeepa.reduce((sum: number, item: any) => sum + item.NotStarted, 0);
        const completedCountDeepa = filteredListDataDeepa.reduce((sum: number, item: any) => sum + item.Completed, 0);
        const cancelledCountDeepa = filteredListDataDeepa.reduce((sum: number, item: any) => sum + item.Cancelled, 0);

        const filteredListDataUmarani = listDataWithKeys.filter((item: any) => item.AssignedTo === "Umarani");
        const totalCountUmarani = filteredListDataUmarani.length;
        const inProgressCountUmarani = filteredListDataUmarani.reduce((sum: number, item: any) => sum + item.Inprogress, 0);
        const notStartedCountUmarani = filteredListDataUmarani.reduce((sum: number, item: any) => sum + item.NotStarted, 0);
   const completedCountUmarani = filteredListDataUmarani.reduce((sum: number, item: any) => sum + item.Completed, 0);
        const cancelledCountUmarani = filteredListDataUmarani.reduce((sum: number, item: any) => sum + item.Cancelled, 0);

        
        
        this.setState({
          listData: listDataWithKeys,
          totalCount1,
          totalCountKG,
          inProgressCountKG,
          notStartedCountKG,
          completedCountKG,
          cancelledCountKG,
          totalCountDeepa,
          inProgressCountDeepa,
          notStartedCountDeepa,
          completedCountDeepa,
          cancelledCountDeepa,
          totalCountUmarani,
          inProgressCountUmarani,
          notStartedCountUmarani,
          completedCountUmarani,
          cancelledCountUmarani,
          totalInProgressCount,
          totalNotstartedCount,
          totalcompletedCount,
          totalCancelledCount
        });
        console.log("Data loaded successfully:", this.state.listData);
      } else {
        console.error('Error loading list data. Status:', response.status, 'Status Text:', response.statusText);
      }
    } catch (error) {
      console.error('Error loading list data:', error);
    }
  }
  private countTasksForUserAndDate(user: 'KG' | 'Deepa Vinod' | 'Umarani', date: string) {
    const filteredItems = this.state.listData.filter(
      (item: any) => {
        const isMatchingUser = item.AssignedTo === user;
  
        // Log information for debugging
        console.log('AssignedTo:', item.AssignedTo);
        console.log('StartDate:', item.StartDate);
        console.log('Expected Date:', date);
  
        // Convert StartDate to a format without time component
        const itemDate = new Date(item.StartDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
        console.log('Converted Date:', itemDate);
  
        const isMatchingDate = itemDate === date;
  
        console.log('Is Matching User:', isMatchingUser);
        console.log('Is Matching Date:', isMatchingDate);
  
        return isMatchingUser && isMatchingDate;
      }
    );
  
    return filteredItems.length;
  }
  
  private countTasksForUserAndInprogress(user: 'KG' | 'Deepa Vinod' | 'Umarani', date: string) {
    const filteredItems = this.state.listData.filter(
      (item: any) => {
        // Check if AssignedTo is KG, InProgress is 1, and StartDate matches lastDate or comingDate
        const isMatchingUser = item.AssignedTo === user;
        const isInProgress = item.Inprogress === 1;
  
        // Convert StartDate to a format without time component
        const itemDate = new Date(item.StartDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
        
        // Check if StartDate matches lastDate or comingDate
        const isMatchingDate = itemDate === date;
  
        // Log information for debugging
        console.log('AssignedTo:', item.AssignedTo);
        console.log('StartDate:', item.StartDate);
        console.log('Expected Date:', date);
        console.log('InProgress:', item.Inprogress);
        console.log('Converted Date:', itemDate);
        console.log('Is Matching User:', isMatchingUser);
        console.log('Is In Progress:', isInProgress);
        console.log('Is Matching Date:', isMatchingDate);
  
        return isMatchingUser && isInProgress && isMatchingDate;
      }
    );
  
    return filteredItems.length;
  }
  private countTasksForUserAndcompleted(user: 'KG' | 'Deepa Vinod' | 'Umarani', date: string) {
    const filteredItems = this.state.listData.filter(
      (item: any) => {
        // Check if AssignedTo is KG, InProgress is 1, and StartDate matches lastDate or comingDate
        const isMatchingUser = item.AssignedTo === user;
        const iscompleted = item.Completed === 1;
  
        // Convert StartDate to a format without time component
        const itemDate = new Date(item.StartDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
        
        // Check if StartDate matches lastDate or comingDate
        const isMatchingDate = itemDate === date;
  
        // Log information for debugging
        console.log('AssignedTo:', item.AssignedTo);
        console.log('StartDate:', item.StartDate);
        console.log('Expected Date:', date);
        console.log('completed:', item.completed);
        console.log('Converted Date:', itemDate);
        console.log('Is Matching User:', isMatchingUser);
        console.log('Is completed:', iscompleted);
        console.log('Is Matching Date:', isMatchingDate);
  
        return isMatchingUser && iscompleted && isMatchingDate;
      }
    );
  
    return filteredItems.length;
  }
  
  private countDateForUserAndDate(user: 'KG' | 'Deepa Vinod' | 'Umarani') {
  const currentDate = this.getCurrentDate();

  const filteredItems = this.state.listData.filter((item: any) => {
    const isMatchingUser = item.AssignedTo === user;

    const itemDate = new Date(item.StartDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    const isMatchingDate = itemDate === currentDate;

    return isMatchingUser && isMatchingDate;
  });

  return filteredItems.length;
}

private countDateForUserAndInprogress(user: 'KG' | 'Deepa Vinod' | 'Umarani') {
  const currentDate = this.getCurrentDate();

  const filteredItems = this.state.listData.filter((item: any) => {
    const isMatchingUser = item.AssignedTo === user;
    const isInProgress = item.Inprogress === 1;

    const itemDate = new Date(item.StartDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    const isMatchingDate = itemDate === currentDate;

    return isMatchingUser && isInProgress && isMatchingDate;
  });

  return filteredItems.length;
}

private countDateForUserAndCompleted(user: 'KG' | 'Deepa Vinod' | 'Umarani') {
  const currentDate = this.getCurrentDate();

  const filteredItems = this.state.listData.filter((item: any) => {
    const isMatchingUser = item.AssignedTo === user;
    const isCompleted = item.Completed === 1;

    const itemDate = new Date(item.StartDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    const isMatchingDate = itemDate === currentDate;

    return isMatchingUser && isCompleted && isMatchingDate;
  });

  return filteredItems.length;
}
calculateTotal = () => {
  const { lastFiveDates, comingFiveDates } = this.state;

  // Calculate total for each user and each date, including the current date
  const grandTotal = lastFiveDates
    .concat(comingFiveDates, this.getCurrentDate())
    .reduce((total: number, date: any) => {
      return (
        total +
        this.countTasksForUserAndDate('KG', date) +
        this.countTasksForUserAndInprogress('KG', date) +
        this.countTasksForUserAndcompleted('KG', date) +
        this.countTasksForUserAndDate('Deepa Vinod', date) +
        this.countTasksForUserAndInprogress('Deepa Vinod', date) +
        this.countTasksForUserAndcompleted('Deepa Vinod', date) +
        this.countTasksForUserAndDate('Umarani', date) +
        this.countTasksForUserAndInprogress('Umarani', date) +
        this.countTasksForUserAndcompleted('Umarani', date)
      );
    }, 0);

  return grandTotal;
};

  public render(): React.ReactElement<any> {
    const {
      listData,
      totalCount1,
      inProgressCountKG,
      notStartedCountKG,
      completedCountKG,
      cancelledCountKG,
      totalCountKG,
      totalCountDeepa,
      inProgressCountDeepa,
      notStartedCountDeepa,
      completedCountDeepa,
      cancelledCountDeepa,
      totalCountUmarani,
      inProgressCountUmarani,
      notStartedCountUmarani,
      completedCountUmarani,
      cancelledCountUmarani,
      totalInProgressCount,
      totalNotstartedCount,
      totalcompletedCount,
      totalCancelledCount,
      lastFiveDates, 
      comingFiveDates,
      //currentDate

    } = this.state;

    console.log("listdata",listData)
  // Add these lines for debugging
  listData.forEach((item: any) => {
    console.log("NotStarted for", item.AssignedTo, ":", item.NotStarted);
  });
    return (
      <section className={styles.dashboard} >
        <div className={styles.welcome}>
         
         <table className={styles.table1}>
  <tr>
    <th colSpan={2 as number} 
    style={{
      border:"1px",
      padding:"5px",
      textAlign:"center",
      background:"#EC7213"
 
    }}>Statuscount</th>
    <th  style={{
      border:"1px",
      padding:"5px",
      textAlign:"center",
      background:"#1393EC"
 
    }}>KG</th> 
    <th  style={{
      border:"1px",
      padding:"5px",
      textAlign:"center",
      background:"#EC7213"
 
    }}>Deepa</th>
    <th  style={{
      border:"1px",
      padding:"5px",
      textAlign:"center",
      background:"#F5BA33 "
 
    }}>Umarani</th>
  </tr>
 
  <tr>
    <td className={styles.td}>Total Task</td>
    <td className={styles.td1}>{totalCount1}</td>
    <td className={styles.td2}>{totalCountKG}</td>
    <td className={styles.td3}>{totalCountDeepa}</td>
  <td className={styles.td4}>{totalCountUmarani}</td>
    
  </tr>
  <tr>
     <td className={styles.td}>NotStarted</td>
     <td className={styles.td1}>{totalNotstartedCount}</td>
     <td className={styles.td2}>{notStartedCountKG}</td>
     <td className={styles.td3}>{notStartedCountDeepa}</td>
     <td className={styles.td4}>{notStartedCountUmarani}</td>
            
  </tr>
   <tr>
     <td className={styles.td}>Inprogress</td>
     <td className={styles.td1}>{ totalInProgressCount}</td>
     <td className={styles.td2}>{inProgressCountKG}</td>
      <td className={styles.td3}>{inProgressCountDeepa}</td>
      <td className={styles.td4}>{inProgressCountUmarani}</td>
   </tr>
   <tr>
              <td className={styles.td}>Completed</td>
              <td className={styles.td1}>{totalcompletedCount}</td>
              <td className={styles.td2}>{completedCountKG}</td>
              <td className={styles.td3}>{completedCountDeepa}</td>
              <td className={styles.td4}>{completedCountUmarani}</td>
            </tr>
            <tr>
              <td className={styles.td}>Cancelled</td>
              <td className={styles.td1}>{totalCancelledCount}</td>
              <td className={styles.td2}>{cancelledCountKG}</td>
              <td className={styles.td3}>{cancelledCountDeepa}</td>
              <td className={styles.td4}>{cancelledCountUmarani}</td>
            </tr>

</table>
<div><h4 className={styles.h4}>10 Days Task Summary</h4></div>


<table  className={styles.table2}>
<tr className={styles.tr1}>
              <td></td>
              {lastFiveDates.map((date: string, index: number) => (
                <td style={{ boxSizing:'border-box',border:"1px solid grey" }} key={index}>{date}</td>
              ))} <td style={{ boxSizing: 'border-box', border: "1px solid grey", background:"#c9f9d6" }}>{this.getCurrentDate()}</td>
              {comingFiveDates.map((date: string, index: number) => (
                 <td style={{ boxSizing:'border-box',border:"1px solid grey" }} key={index}>{date}</td>
              ))} <th>Total</th>
            </tr>

            <tr className={styles.tr2}>
        <th className={styles.KG1}>KG</th>
        {lastFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndDate('KG', date)}</td>
        ))}  <td className={styles.green} key="currentDateColumn">{this.countDateForUserAndDate('KG')}</td>
        {comingFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndDate('KG', date)}</td>
        ))}<td className={styles.t1}>
        {/* Calculate total for KG */}
        {lastFiveDates.concat(comingFiveDates,this.getCurrentDate()).reduce((total: number, date:any) => 
          total + this.countTasksForUserAndDate('KG', date), 0)}
      </td>
      </tr>
     
      <tr className={styles.tr3}>
        <td  className={styles.KG}>Inprogress</td>
        {lastFiveDates.map((date: string, index: number) => (
          <td  key={index}>{this.countTasksForUserAndInprogress('KG', date)}</td>
        ))}<td key="currentDateColumn" className={styles.green}>{this.countDateForUserAndInprogress('KG')}</td>
        {comingFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndInprogress('KG', date)}</td>
        ))}
        <td className={styles.t1}>
        {/* Calculate total for KG */}
        {lastFiveDates.concat(comingFiveDates,this.getCurrentDate()).reduce((total: number, date:any) => 
          total + this.countTasksForUserAndInprogress('KG', date), 0)}
      </td>
      </tr>
     
      <tr className={styles.tr3}>
        <td  className={styles.KG}>Completed</td>
        {lastFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndcompleted('KG', date)}</td>
        ))}<td key="currentDateColumn" className={styles.green}>{this.countDateForUserAndCompleted('KG')}</td>
        {comingFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndcompleted('KG', date)}</td>
        ))}
         <td className={styles.t1}>
        {/* Calculate total for KG */}
        {lastFiveDates.concat(comingFiveDates,this.getCurrentDate()).reduce((total: number, date:any) => 
          total + this.countTasksForUserAndcompleted('KG', date), 0)}
      </td>
      </tr>
  <tr className={styles.tr8}>
        <th className={styles.deepa1}>Deepa</th>
        {lastFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndDate('Deepa Vinod', date)}</td>
        ))}<td className={styles.green} key="currentDateColumn">{this.countDateForUserAndDate('Deepa Vinod')}</td>
        {comingFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndDate('Deepa Vinod', date)}</td>
        ))}
          <td className={styles.t2}>
        {/* Calculate total for KG */}
        {lastFiveDates.concat(comingFiveDates, this.getCurrentDate()).reduce((total: number, date:any) => 
          total + this.countTasksForUserAndDate('Deepa Vinod', date), 0)}
      </td>
      </tr>
      <tr className={styles.tr6}>
        <td className={styles.deepa}>Inprogress</td>
        {lastFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndInprogress('Deepa Vinod', date)}</td>
        ))}<td key="currentDateColumn" className={styles.green}>{this.countDateForUserAndInprogress('Deepa Vinod')}</td>
        {comingFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndInprogress('Deepa Vinod', date)}</td>
        ))}
          <td className={styles.t2}>
        {/* Calculate total for KG */}
        {lastFiveDates.concat(comingFiveDates ,this.getCurrentDate()).reduce((total: number, date:any) => 
          total + this.countTasksForUserAndInprogress('Deepa Vinod', date), 0)}
      </td>
      </tr>
      <tr className={styles.tr6}>
        <td className={styles.deepa}>Completed</td>
        {lastFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndcompleted('Deepa Vinod', date)}</td>
        ))}<td key="currentDateColumn" className={styles.green}>{this.countDateForUserAndCompleted('Deepa Vinod')}</td>
        {comingFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndcompleted('Deepa Vinod', date)}</td>
        ))}  <td className={styles.t2}>
        {/* Calculate total for KG */}
        {lastFiveDates.concat(comingFiveDates,this.getCurrentDate()).reduce((total: number, date:any) => 
          total + this.countTasksForUserAndcompleted('Deepa Vinod', date), 0)}
      </td>
      </tr>
  <tr className={styles.tr9}>
        <th className={styles.uma1}>Umarani</th>
        {lastFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndDate('Umarani', date)}</td>
        ))}<td className={styles.green} key="currentDateColumn">{this.countDateForUserAndDate('Umarani')}</td>
        {comingFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndDate('Umarani', date)}</td>
        ))}  <td className={styles.t3}>
        {/* Calculate total for KG */}
        {lastFiveDates.concat(comingFiveDates,this.getCurrentDate()).reduce((total: number, date:any) => 
          total + this.countTasksForUserAndDate('Umarani', date), 0)}
      </td>
      </tr>
      <tr className={styles.tr7}>
        <td className={styles.uma}>Inprogress</td>
        {lastFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndInprogress('Umarani', date)}</td>
        ))}<td key="currentDateColumn" className={styles.green}>{this.countDateForUserAndInprogress('Umarani')}</td>
        {comingFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndInprogress('Umarani', date)}</td>
        ))}  <td className={styles.t3}>
        {/* Calculate total for KG */}
        {lastFiveDates.concat(comingFiveDates,this.getCurrentDate()).reduce((total: number, date:any) => 
          total + this.countTasksForUserAndInprogress('Umarani', date), 0)}
      </td>
      </tr>
      <tr className={styles.tr7}>
        <td className={styles.uma}>Completed</td>
        {lastFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndcompleted('Umarani', date)}</td>
        ))}<td key="currentDateColumn" className={styles.green}>{this.countDateForUserAndCompleted('Umarani')}</td>
        {comingFiveDates.map((date: string, index: number) => (
          <td key={index}>{this.countTasksForUserAndcompleted('Umarani', date)}</td>
        ))}
          <td className={styles.t3}>
        {/* Calculate total for KG */}
        {lastFiveDates.concat(comingFiveDates,this.getCurrentDate()).reduce((total: number, date:any) => 
          total + this.countTasksForUserAndcompleted('Umarani', date), 0)}
      </td>
      </tr>
    

<tr className={styles.tr5}>
  <th>Total</th>
  {lastFiveDates.map((date: string, index: number) => (
    <td key={index}>
      {this.countTasksForUserAndDate('KG', date) +
        this.countTasksForUserAndInprogress('KG', date) +
        this.countTasksForUserAndcompleted('KG', date) +
        this.countTasksForUserAndDate('Deepa Vinod', date) +
        this.countTasksForUserAndInprogress('Deepa Vinod', date) +
        this.countTasksForUserAndcompleted('Deepa Vinod', date) +
        this.countTasksForUserAndDate('Umarani', date) +
        this.countTasksForUserAndInprogress('Umarani', date) +
        this.countTasksForUserAndcompleted('Umarani', date)
        

        }
    </td>
  ))} <td>
  {[
    this.countDateForUserAndDate('KG'),
    this.countDateForUserAndInprogress('KG'),
    this.countDateForUserAndCompleted('KG'),
    this.countDateForUserAndDate('Deepa Vinod'),
    this.countDateForUserAndInprogress('Deepa Vinod'),
    this.countDateForUserAndCompleted('Deepa Vinod'),
    this.countDateForUserAndDate('Umarani'),
    this.countDateForUserAndInprogress('Umarani'),
    this.countDateForUserAndCompleted('Umarani'),
  ].reduce((total: number, count: number) => total + count, 0)}
</td>
  {comingFiveDates.map((date: string, index: number) => (
    <td key={index}>
      {this.countTasksForUserAndDate('KG', date) +
        this.countTasksForUserAndInprogress('KG', date) +
        this.countTasksForUserAndcompleted('KG', date) +
        this.countTasksForUserAndDate('Deepa Vinod', date) +
        this.countTasksForUserAndInprogress('Deepa Vinod', date) +
        this.countTasksForUserAndcompleted('Deepa Vinod', date) +
        this.countTasksForUserAndDate('Umarani', date) +
        this.countTasksForUserAndInprogress('Umarani', date) +
        this.countTasksForUserAndcompleted('Umarani', date)
        
        }
    </td>
  ))} <td className={styles.t4}>{this.calculateTotal()}</td>
</tr>


 
</table>
        </div>
      </section>
    );
  }
}
