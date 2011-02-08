// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var main_win = Titanium.UI.createWindow({  
    title:'Tax Calculator',
    backgroundColor:'#fff',
	modal: true
});

var win = Titanium.UI.createScrollView({
    contentHeight:'auto',
    top:0,
    showHorizontalScrollIndicator:true
});

var calculated_tax = Titanium.UI.createLabel({
	color:'#999',
	text:'Enter Values to calculate Tax',
	font:{fontSize:30,fontFamily:'Helvetica Neue'},
	backgroundPaddingBottom: 20,
	textAlign:'left',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	width:'auto',
	height: "auto"
});

function getLabel(label_text){
	return Titanium.UI.createLabel({
		color:'#999',
		text:label_text,
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'left',
		width: 'auto',
		height: 'auto',
		top: 5
	});
	
	
}

function getTextField(){
	return Titanium.UI.createTextField(
		{
			color:'#336699',
		    value:'',
		 	hintText: "0",
			width: 300,
			height: 25,
			visible: true,
			editable: true,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
			returnKeyType: Titanium.UI.RETURNKEY_DONE
			
		}
		);
	
}

win.layout = "vertical";

var income, investment, infraInvsetment, housingInterest, medicalPremium;
var income_f, investment_f, infraInvestment_f, housingInterest_f, medicalPremium_f;
var calculateTaxBut;
income  =  getLabel("Please enter your income");
income_f = getTextField();
investment_f = getTextField();
infraInvestment_f = getTextField();
housingInterest_f = getTextField();
medicalPremium_f = getTextField();
investment = getLabel("Investment under 80C");
infraInvestment = getLabel("Investment under 80D");
housingInterest = getLabel("Interests on housing loans");
medicalPremium =  getLabel("Medical insurance premium");

calculateTaxBut = Titanium.UI.createButton({
	
	title: "Calculate Tax"
	//style: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	//height: "30",
	//width: "300"
});

calculateTaxBut = Titanium.UI.createButton({
	title:'Calculate Tax',
	height:40,
	width:200,
	top:10
});


win.add(calculated_tax);
win.add(income);
win.add(income_f);
win.add(investment);
win.add(investment_f);
win.add(infraInvestment);
win.add(infraInvestment_f);
win.add(housingInterest);
win.add(housingInterest_f);
win.add(medicalPremium);
win.add(medicalPremium_f);
win.add(calculateTaxBut);

main_win.add(win);
main_win.open({fullScreen: true});

calculateTaxBut.addEventListener("click", function(){
	var income = income_f.value;
	var investment = investment_f.value;
	var infra_investment = infraInvestment_f.value;
	var housing_interest = housingInterest_f.value;
	var medical_premium = medicalPremium_f.value;
	if (!income){
		income = 0;
	}
	if (!investment){
		investment = 0;
	}
	if (!infra_investment){
		infra_investment = 0;
	}
	if (!housing_interest){
		housing_interest = 0;
	}
	if (!medical_premium){
		medical_premium = 0;
	}
	
	income = parseInt(income);
	investment = parseInt(investment);			
	infra_investment = parseInt(infra_investment);
	housing_interest = parseInt(housing_interest);
	medical_premium = parseInt(medical_premium);									
	
	var tax = calculateTax(income, investment, infra_investment, housing_interest, medical_premium);
	calculated_tax.text = ""+tax;
	
});



function getTax(taxableIncome){
    var taxOnThisSlab;
    if (taxableIncome < 160000) {
        return 0;
    }
    else if (taxableIncome < 500000){
        taxOnThisSlab = 0.1 * (taxableIncome - 160000);
        return taxOnThisSlab;
    }
    else if (taxableIncome < 800000){
        taxOnThisSlab = 0.2 * (taxableIncome - 500000);
        return taxOnThisSlab + 34000;

    }
    else {
        taxOnThisSlab = 0.3 * (taxableIncome - 800000);
        return taxOnThisSlab + 94000;
    }

}


function calculateTax(income, investment, infra_investment, housing_interest, medical_premium){
	investment = Math.max(0, Math.min(investment, 100000));
	infra_investment = Math.max(0, Math.min(infra_investment, 20000));
	housing_interest = Math.max(0, Math.min(housing_interest, 15000));
	medical_premium = Math.max(0, Math.min(medical_premium, 35000));
	var taxable_income = income -  (investment + infra_investment + housing_interest + medical_premium);
	var tax = getTax(taxable_income);
	return tax;
}

