import type { SubscriptionGateway } from '../../../pro/app/features/gli/Subscriptions/api-subscription';
import type { SmartGarantResponse } from '../../../pro/app/features/common/model/SmartGarantResponse';
import type { GLICreationResponse } from '../../../pro/app/features/gli/Subscriptions/model/GLICreationResponse';
import type { Kpi } from '../../../pro/app/features/gli/Subscriptions/model/kpi';
import type { getKpiRequest, getSubscriptionRequest } from '../../../pro/app/features/gli/Subscriptions/api-subscription';

function makeResponse<T>(payload: T): SmartGarantResponse<T> {
  return {
    requestId: `mock-${Date.now()}`,
    payload,
    error: { errorCode: '', message: '' },
    resultStats: 0,
  };
}

function buildMockSubscription(): GLICreationResponse {
  const now = new Date().toISOString();
  return {
    status: 1,
    organization: {
      id: 'org-1',
      name: 'Agence Mock Immo',
      type: 1,
    },
    gliIntegration: {
      adbCode: 'ADB-MOCK-001',
      premiumRate: 0.0285,
      addedAt: now,
    },
    adbInformations: {
      companyName: 'Agence Mock Immo',
      address: {
        country: 'FR',
        address: '10 Rue de la Paix',
        zipCode: '75002',
        city: 'Paris',
        isManual: true,
      },
      phone: {
        phoneOrigin: 'FR',
        phoneContryCode: '+33',
        phoneFormated: '01 23 45 67 89',
      },
      email: 'contact@mock-immo.fr',
      creationDate: '2010-01-01',
      directorName: 'Alice Dupont',
      professionalCardNumber: 'CP-123456',
      guaranteeOrganization: 'Mock Garanties',
      guaranteeAmount: 100000,
      siren: '123456789',
      isSyndic: true,
      isPropertyManagement: true,
      isTransaction: false,
      portfolioManagement: {
        housing: { managedLotsCount: 120, insuredLotsCount: 85, averageRentAmount: 890, highestRentAmount: 2500 },
        commercial: { managedLotsCount: 8, insuredLotsCount: 5, averageRentAmount: 1800, highestRentAmount: 4200 },
        other: { managedLotsCount: 4, insuredLotsCount: 2, averageRentAmount: 600, highestRentAmount: 950 },
      },
      hasPreviousInsurance: true,
      previousInsuranceInformation: {
        currentInsurerName: 'Assureur Mock',
        currentRate: 0.03,
        monthlyPremiumAmount: 250,
        anniversaryDate: '2024-09-01',
        isContractTerminated: false,
        terminationBy: 0,
        terminationReason: '',
        currentSolvencyCriterion: 33,
        plansMailingToOwners: false,
      },
      options: {
        rentGuarantee: true,
        legalProtection: true,
        commercialLeases: false,
        vacancyCoverage: false,
        nonOccupantOwnerCoverage: false,
      },
    },
    documentIds: [],
    applicationCount: 25,
    activatedGLICount: 12,
    openClaimsCount: 2,
    totalRent: 14850,
    sequence: 1,
    createDate: now,
    updateDate: now,
    id: 'sub-mock-1',
    idString: 'sub-mock-1',
  };
}

function buildMockKpi(): Kpi {
  return {
    activeRentalApprovalCount: 7,
    approvedRentalApprovalCount: 14,
    averageGuaranteedRentAmount: 920,
    claimCount: 3,
    rentalApprovalCount: 32,
  };
}

export class MockSubscriptionGateway implements SubscriptionGateway {
  private subscription: GLICreationResponse;
  private kpi: Kpi;

  constructor() {
    this.subscription = buildMockSubscription();
    this.kpi = buildMockKpi();
  }

  async getSubscription(_: getSubscriptionRequest): Promise<SmartGarantResponse<GLICreationResponse>> {
    return makeResponse(this.subscription);
  }

  async getKpi(_: getKpiRequest): Promise<SmartGarantResponse<Kpi>> {
    return makeResponse(this.kpi);
  }
}

export default MockSubscriptionGateway;

